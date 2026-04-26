import z from "zod";

export const DictionaryDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export type DictionaryDto = z.infer<typeof DictionaryDtoSchema>;
