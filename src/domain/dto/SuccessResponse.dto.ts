import type { ApiSuccessResponse } from "~/types/response.types";

export class SuccessResponse<T> implements ApiSuccessResponse<T> {
	success: true = true;
	data: T;

	constructor(data: T) {
		this.data = data;
	}
}
