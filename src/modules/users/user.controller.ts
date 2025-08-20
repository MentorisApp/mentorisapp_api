import { paramNumber } from "@utils/validators.util";
import { FastifyPluginAsync } from "fastify";
import { createUserService } from "./user.service";
import { userCreateSchema, userUpdateSchema } from "./user.validator";

export const userController: FastifyPluginAsync = async (app) => {
	const userService = createUserService(app);

	app.get("/", async () => {
		return await userService.getAllUsers();
	});

	app.get("/:id", async (request) => {
		const { id } = paramNumber("id").parse(request.params);
		return await userService.getUserById(id);
	});

	app.post("/", async (request) => {
		const body = userCreateSchema.parse(request.body);
		return await userService.createUser(body);
	});

	app.put("/", async (request) => {
		const body = userUpdateSchema.parse(request);
		return await userService.updateUser(body);
	});

	app.delete("/:id", async (request) => {
		const { id } = paramNumber("id").parse(request.params);
		return await userService.deleteUser(id);
	});
};
