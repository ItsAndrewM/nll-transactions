import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "NEXT_PUBLIC",
	client: {
		NEXT_PUBLIC_API_URL: z.string().min(1),
		NEXT_PUBLIC_API_KEY: z.string().min(1),
	},
	runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
	},
});
