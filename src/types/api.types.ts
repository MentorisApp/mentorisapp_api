import { ApiCode } from "~/enums/apiCode.enum";
import { DomainCode } from "~/enums/domainCode.enum";

export type ApiResponse<T = unknown> = {
	data: T | null;
	success: boolean;
	message: string | null;
	code: ApiCode;
	domainCode: DomainCode | null;
};
