import { ApiCode } from "~/constants/apiCode.enum";
import { ApiResponse } from "~/plugins/response.plugin";

type BuildErrorResponseArgs = Omit<ApiResponse<null>, "data" | "success">;

export function buildErrorResponse(error: BuildErrorResponseArgs): ApiResponse<null> {
	return {
		data: null,
		success: false,
		message: error.message ?? "Internal Server Error",
		code: error.code ?? ApiCode.INTERNAL_SERVER_ERROR,
		domainCode: error.domainCode ?? null,
	};
}
