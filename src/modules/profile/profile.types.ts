import { createProfileService } from "./profile.services";

export namespace ProfileService {
	export type Service = ReturnType<typeof createProfileService>;

	export type CreateProfile = Service["createProfile"];
	export type GetProfile = Service["getProfile"];
	export type UpdateProfile = Service["updateProfile"];
	export type CheckExistsProfileByUserId = Service["checkExistsProfileByUserId"];
}
