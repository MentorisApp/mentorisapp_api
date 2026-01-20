import { loginUserUseCase } from "./use-cases/loginUser.useCase";
import { logoutUserUseCase } from "./use-cases/logoutUser.useCase";
import { refreshTokenUseCase } from "./use-cases/refreshToken.useCase";
import { registerUserUseCase } from "./use-cases/registerUser.useCase";
import { requestResetPasswordUseCase } from "./use-cases/requestResetPassword.useCase";
import { resendVerificationLinkUseCase } from "./use-cases/resendVerificationLink.useCase";
import { resetPasswordUseCase } from "./use-cases/resetPassword.useCase";
import { verifyAndLoginUserUseCase } from "./use-cases/verifyAndLoginUser.useCase";

export const authController = () => {
	return {
		verifyAndLoginAccount: verifyAndLoginUserUseCase,
		register: registerUserUseCase,
		login: loginUserUseCase,
		logout: logoutUserUseCase,
		refresh: refreshTokenUseCase,
		requestResetPassword: requestResetPasswordUseCase,
		resetPassword: resetPasswordUseCase,
		resendVerificationLink: resendVerificationLinkUseCase,
	};
};
