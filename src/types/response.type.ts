import { ZodError } from "zod";
import { $ZodFlattenedError } from "zod/v4/core";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export type Metadata = {
	requestId: string;
	timestamp: string;
};

export type ApiErrorResponse = {
	success: false;
	message: string | null;
	detail: ZodError["issues"] | $ZodFlattenedError<unknown> | string | null;
	meta: Metadata & { status: HttpStatus };
};

export type ApiSuccessResponse<T> = {
	success: true;
	data: T;
};
