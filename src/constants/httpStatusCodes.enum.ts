export enum HttpStatus {
	/* ------------------------------- 2xx Success ------------------------------ */
	OK = 200, // Standard success
	CREATED = 201, // Resource created
	ACCEPTED = 202, // Request accepted for async processing
	NO_CONTENT = 204, // Success, but no response body

	/* ----------------------------- 3xx Redirection ---------------------------- */
	MOVED_PERMANENTLY = 301, // Permanent redirect
	FOUND = 302, // Temporary redirect
	NOT_MODIFIED = 304, // Cache hit

	/* ---------------------------- 4xx Client Errors --------------------------- */
	BAD_REQUEST = 400, // Invalid request payload or parameters
	UNAUTHORIZED = 401, // Missing/invalid authentication
	FORBIDDEN = 403, // Authenticated but not allowed
	NOT_FOUND = 404, // Resource not found
	METHOD_NOT_ALLOWED = 405, // Wrong HTTP method
	CONFLICT = 409, // Conflict (e.g. unique constraint)
	PAYLOAD_TOO_LARGE = 413, // Request body too big
	UNSUPPORTED_MEDIA_TYPE = 415, // Wrong content-type
	UNPROCESSABLE_ENTITY = 422, // Validation failed
	TOO_MANY_REQUESTS = 429, // Rate limiting

	/* ---------------------------- 5xx Server Errors --------------------------- */
	INTERNAL_SERVER_ERROR = 500, // Generic server error
	NOT_IMPLEMENTED = 501, // Not supported by server
	BAD_GATEWAY = 502, // Invalid response from upstream
	SERVICE_UNAVAILABLE = 503, // Server temporarily overloaded/down
	GATEWAY_TIMEOUT = 504, // Upstream timeout
}
