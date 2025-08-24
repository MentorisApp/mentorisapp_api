import { ZodError } from "zod";

export type Metadata = {
	requestId: string;
	timestamp: string;
};

export type ApiErrorResponse = {
	success: false;
	requestId: string;
	timestamp: string;
	message: string;
	detail: ZodError["issues"] | string | null;
};

export type ApiSuccessResponse<T> = {
	success: true;
	data: T;
};
