import 'dotenv/config';

import { verifyKey } from 'discord-interactions';
import { Request, Response } from 'express';

export function VerifyDiscordRequest(clientKey: string) {
	return function (req: Request, res: Response, buf: any) {
		const signature = req.get('X-Signature-Ed25519') as string;
		const timestamp = req.get('X-Signature-Timestamp') as string;

		const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);

		if (!isValidRequest) {
			res.status(401).send('Bad request signature');
			throw new Error('Bad request signature');
		}
	};
}
