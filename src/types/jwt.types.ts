export interface JwtPayload {
	sub?: string;
	jti?: string;
	role?: string;
	permissions?: string[];
}
