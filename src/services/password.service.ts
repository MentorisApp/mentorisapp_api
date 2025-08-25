import bcrypt from "bcrypt";

export const passwordService = {
	hash: async (password: string) => {
		const saltRounds = 12;
		return bcrypt.hash(password, saltRounds);
	},

	compare: async (password: string, hashedPassword: string) => {
		return bcrypt.compare(password, hashedPassword);
	},
};
