import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
	PUBLIC_KEY: z.string().nonempty('Missing discord app public key'),
	APP_ID: z.string().nonempty('Missing discord app id'),
	APP_TOKEN: z.string().nonempty('Missing discord app token'),
});

export const config = schema.parse(process.env);
