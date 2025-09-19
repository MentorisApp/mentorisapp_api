import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { InvalidCredentialsError } from "~/domain/errors/InvalidCredentialsError";
import { env } from "~/env";
import { passwordService } from "~/services/password.service";
import { createTokenService } from "~/services/token.service";
import { createUserService } from "~/services/user.service";
import { parseDurationMs } from "~/utils/parseDuration.util";
import { UserCreateSchema } from "~/validators/user.validator";

export const useAuthController = (app: FastifyInstance) => {
	const tokenService = createTokenService(app);
	const userService = createUserService(app);

	const register = async (request: FastifyRequest, reply: FastifyReply) => {
		const payload = UserCreateSchema.parse(request.body);
		const isUserExisting = await userService.checkUserExistsByEmail(payload.email);

		if (isUserExisting) {
			throw new AlreadyExistsError("Email already in use");
		}

		const hashedPassword = await passwordService.hash(payload.password);
		const jti = tokenService.generateJti();

		const newUser = await userService.createUser({
			email: payload.email,
			password: hashedPassword,
		});

		const accessToken = tokenService.issueAccessToken(
			newUser.id,
			newUser.roleId,
			newUser.permissionIds,
		);

		const refreshToken = await tokenService.issueRefreshToken(newUser.id, jti);

		reply.status(HttpStatus.CREATED).setCookie("refreshToken", refreshToken, {
			maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
		});

		return { accessToken };
	};

	const login = async (request: FastifyRequest, reply: FastifyReply) => {
		const payload = UserCreateSchema.parse(request.body);
		const user = await userService.getUserByEmail(payload.email);
		const isPasswordValid = await passwordService.compare(payload.password, user.password);

		if (!user || !isPasswordValid) {
			throw new InvalidCredentialsError();
		}

		const jti = tokenService.generateJti();
		const userPermission = await userService.getUserPermission(user.id);

		const accessToken = await tokenService.issueAccessToken(
			user.id,
			userPermission.roleId,
			userPermission.permissionIds,
		);

		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		reply.status(HttpStatus.OK).setCookie("refreshToken", refreshToken, {
			maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
		});

		return { accessToken };
	};

	const logout = async (request: FastifyRequest, reply: FastifyReply) => {
		const refreshToken = request.cookies.refreshToken;

		if (refreshToken) {
			const { valid, value: token } = app.unsignCookie(refreshToken);

			if (!valid) {
				return reply.status(HttpStatus.BAD_REQUEST).send({ error: "Invalid cookie" });
			}

			await tokenService.revokeRefreshToken(token);
			return reply.clearCookie("refreshToken").status(HttpStatus.NO_CONTENT).send();
		}

		return reply.status(HttpStatus.NO_CONTENT).send();
	};

	// TODO errors handling, custom domain add
	const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
		const oldRefreshTokenCookie = request.cookies.refreshToken;

		if (!oldRefreshTokenCookie) {
			throw Error("NO REFRESH TOKEN IN COOKIE");
		}

		const { valid, value: oldRefreshToken } = app.unsignCookie(oldRefreshTokenCookie);

		if (!valid) {
			throw Error("REFRESH TOKEN COOKIE NOT VALID");
		}

		const payload = tokenService.verifyRefreshToken(oldRefreshToken);
		const storedToken = await tokenService.getRefreshTokenByJti(payload.jti);

		if (!storedToken || storedToken.revoked) {
			throw Error("Token has been revoked or is expired");
		}

		const newJti = tokenService.generateJti();

		const userPermissions = await userService.getUserPermission(storedToken.userId);

		const newAccessToken = tokenService.issueAccessToken(
			storedToken.userId,
			userPermissions.roleId,
			userPermissions.permissionIds,
		);

		const newRefreshToken = await tokenService.issueRefreshToken(storedToken.userId, newJti);

		await tokenService.revokeRefreshToken(oldRefreshToken);

		reply.status(HttpStatus.OK).setCookie("refreshToken", newRefreshToken, {
			maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
		});

		return newAccessToken;
	};

	return {
		login,
		logout,
		register,
		refresh,
	};
};
