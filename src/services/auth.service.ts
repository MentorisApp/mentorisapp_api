import { FastifyInstance } from "fastify";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { InvalidCredentialsError } from "~/domain/errors/InvalidCredentialsError";
import { UserCreate } from "~/validators/user.validator";
import { passwordService } from "./password.service";
import { createTokenService } from "./token.service";
import { createUserService } from "./user.service";
import { createVerificationTokensService } from "./verificationTokens.service";

export function createAuthService(app: FastifyInstance) {
	const userService = createUserService(app);
	const verificationTokenService = createVerificationTokensService(app);
	const tokenService = createTokenService(app);

	async function register(payload: UserCreate) {
		const isUserExisting = await userService.checkUserExistsByEmail(payload.email);

		if (isUserExisting) {
			throw new AlreadyExistsError("Email already in use");
		}

		const hashedPassword = await passwordService.hash(payload.password);

		const newUser = await userService.createUser({
			email: payload.email,
			password: hashedPassword,
		});

		const verificationToken = await verificationTokenService.createVerificationToken(
			newUser.id,
			"EMAIL_VERIFICATION",
		);

		await app.email.send({
			to: newUser.email,
			template: {
				name: "verifyAccountTemplate",
				variables: {
					// TODO environment domain/host, just needs to pass the token
					link: `http://localhost:3000/api/v1/auth/verify-account?token=${verificationToken}`,
				},
			},
		});
	}

	async function verifyUserAndLogin(token: string) {
		const result = await userService.getUserByVerificationToken(token, "EMAIL_VERIFICATION");

		if (!result) {
			throw new Error("Invalid verification token.");
		}

		const user = result.user;

		await verificationTokenService.markTokenUsed(token);
		await userService.verifyUser(user.id);

		const jti = tokenService.generateJti();
		const { roleId, permissionIds } = await userService.getUserPermission(user.id);

		const accessToken = tokenService.issueAccessToken(user.id, roleId, permissionIds);
		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		return { accessToken, refreshToken };
	}

	async function login(payload: UserCreate) {
		const user = await userService.getUserByEmail(payload.email);
		const isPasswordValid = await passwordService.compare(payload.password, user.password);

		// TODO Check if verified, throw verification error and make user have option to resend verification link
		// TODO If user reaches 5 verification links sent and still didnt verify, ban code resend for 24 hours for that user

		if (!user || !isPasswordValid) {
			throw new InvalidCredentialsError();
		}

		const jti = tokenService.generateJti();
		const userPermission = await userService.getUserPermission(user.id);

		const accessToken = tokenService.issueAccessToken(
			user.id,
			userPermission.roleId,
			userPermission.permissionIds,
		);

		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		return { accessToken, refreshToken };
	}

	async function refresh(oldRefreshToken: string) {
		const payload = tokenService.verifyRefreshToken(oldRefreshToken);
		const storedToken = await tokenService.getRefreshTokenByJti(payload.jti);

		if (!storedToken || storedToken.revoked) {
			throw new Error("Token has been revoked or is expired");
		}

		const newJti = tokenService.generateJti();
		const { roleId, permissionIds } = await userService.getUserPermission(storedToken.userId);

		const accessToken = tokenService.issueAccessToken(storedToken.userId, roleId, permissionIds);
		const refreshToken = await tokenService.issueRefreshToken(storedToken.userId, newJti);

		await tokenService.revokeRefreshToken(oldRefreshToken);

		return { accessToken, refreshToken };
	}

	async function logout(refreshToken: string) {
		if (!refreshToken) {
			return { cleared: false };
		}

		await tokenService.revokeRefreshToken(refreshToken);
		return { cleared: true };
	}

	return {
		register,
		verifyUserAndLogin,
		login,
		refresh,
		logout,
	};
}
