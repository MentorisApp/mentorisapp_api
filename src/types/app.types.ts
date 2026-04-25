import { buildApp } from "~/app";

export type App = Awaited<ReturnType<typeof buildApp>>;
