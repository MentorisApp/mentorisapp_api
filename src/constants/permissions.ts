export const PERMISSIONS = {
	VIEW_USERS: "VIEW_USERS",
	UPDATE_USERS: "UPDATE_USERS",
	CREATE_LISTINGS: "CREATE_LISTINGS",
	APPROVE_LISTINGS: "APPROVE_LISTINGS",
	READ_USER: "READ_USER",
} as const;

export const ROLES = {
	ADMIN: "ADMIN",
	USER: "USER",
	END_USER: "END_USER",
} as const;

// Type representing any valid permission
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
