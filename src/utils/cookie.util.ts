import { FastifyInstance } from "fastify";

import { BadRequestError } from "~/shared/errors/generic/BadRequestError";

type SignedCookieOptions = {
	missingMessage: string;
	invalidMessage: string;
};

export function getSignedCookieOrThrow(
	app: Pick<FastifyInstance, "unsignCookie">,
	cookieValue: string | undefined,
	options: SignedCookieOptions,
) {
	if (!cookieValue) throw new BadRequestError(options.missingMessage);

	const { valid, value } = app.unsignCookie(cookieValue);

	if (!valid) throw new BadRequestError(options.invalidMessage);

	return value;
}
