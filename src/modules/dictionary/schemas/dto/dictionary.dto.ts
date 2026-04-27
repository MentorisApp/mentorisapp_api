import z from "zod";

export const DictionaryDtoSchema = z.object({
	id: z.number(),
	code: z.string(),
	label: z.string(),
});

export type DictionaryDto = z.infer<typeof DictionaryDtoSchema>;
