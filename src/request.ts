import 'dotenv/config';

import { verifyKey } from 'discord-interactions';
import { Request, Response } from 'express';

export function VerifyDiscordRequest(clientKey: string) {
	return async function (req: Request, res: Response, buf: Buffer) {
		const signature = req.get('X-Signature-Ed25519') as string;
		const timestamp = req.get('X-Signature-Timestamp') as string;

		if (!signature || !timestamp) {
			res.status(401).send('Missing required headers');
			throw new Error('Missing required headers for verification');
		}

		const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);

		if (!isValidRequest) {
			res.status(401).send('Bad request signature');
			throw new Error('Bad request signature');
		}
	};
}
