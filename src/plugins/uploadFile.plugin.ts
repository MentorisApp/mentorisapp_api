import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import fastifyMultipart, { MultipartFile } from "@fastify/multipart";
import { FastifyPluginAsync, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { env } from "~/env";
import { getUserIdFromToken } from "~/utils/auth.util";
import { generateUuid } from "~/utils/uuid.util";

import { extname } from "node:path";

export enum S3Location {
	UPLOADS = "uploads",
}

export interface UploadFilePart extends MultipartFile {
	value?: string;
}

const s3Client = new S3({
	forcePathStyle: false,
	endpoint: env.DO_SPACES_ORIGIN_ENDPOINT,
	region: env.DO_SPACES_REGION,
	credentials: {
		accessKeyId: env.DO_SPACES_ACCESS_KEY_ID,
		secretAccessKey: env.DO_SPACES_SECRET_KEY,
	},
});

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

const uploadPluginHandler: FastifyPluginAsync = async (app) => {
	// TODO this runs and uploads even if body validation fails
	async function onFile(this: FastifyRequest, part: UploadFilePart) {
		const userId = getUserIdFromToken(this);

		const extension = extname(part.filename || "") || ".jpg";
		const uuid = generateUuid();
		const key = `uploads/user/${userId}/${uuid}${extension}`;
		const fileBuffer = await part.toBuffer();

		await s3Client.send(
			new PutObjectCommand({
				Bucket: env.DO_SPACES_DEFAULT_BUCKET_NAME,
				Key: key,
				Body: fileBuffer,
				ACL: "public-read",
				ContentType: part.mimetype || "application/octet-stream",
				ContentLength: fileBuffer.length,
			}),
		);

		part.value = `${env.DO_SPACES_CDN_URL}/${key}`;
	}

	app.register(fastifyMultipart, {
		attachFieldsToBody: "keyValues",
		onFile,
		limits: {
			fileSize: MAX_FILE_SIZE,
			files: 1,
		},
	});
};

export const uploadFilePlugin = fp(uploadPluginHandler, { name: "upload-file-plugin" });
