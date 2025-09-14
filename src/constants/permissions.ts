export const Permissions = {
	VIEW_USERS: 1,
	UPDATE_USER: 4,
	DELETE_USERS: 3,
	CREATE_LISTINGS: 4,
	APPROVE_LISTINGS: 33,
} as const;
// TODO permissions
export type Permission = (typeof Permissions)[keyof typeof Permissions];
