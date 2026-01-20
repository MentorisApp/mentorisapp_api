import { createUserProfileUseCase } from "./use-cases/createUserProfile.useCase";
import { getUserProfileByUserIdUseCase } from "./use-cases/getUserProfileByUserId.useCase";
import { updateUserProfileUseCase } from "./use-cases/updateUserProfile.useCase";

export const profileController = () => {
	return {
		getUserProfileByUserId: getUserProfileByUserIdUseCase,
		createUserProfile: createUserProfileUseCase,
		updateUserProfile: updateUserProfileUseCase,
	};
};
