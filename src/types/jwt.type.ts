export interface JwtPayload {
	sub?: string;
	jti?: string;
	roleId?: number;
	permissionIds?: number[];
}
