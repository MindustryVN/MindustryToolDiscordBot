import express, { NextFunction, Request, Response } from 'express';

import { VerifyDiscordRequest } from './request';
import logger from './logger';
import { interaction } from './interaction';
import { config } from './config';
import morgan from 'morgan';
require('express-async-errors');

const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json({ verify: VerifyDiscordRequest(config.PUBLIC_KEY) }));

app.use(morgan('combined'));
logger.info(config);

//@ts-expect-error Wtf
app.route('/interactions').post(interaction);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
	logger.info(`Listening on port: ${PORT}`);
});

import { RequestHandler } from 'express';

export const wrapRequestHandler = (func: RequestHandler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await func(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
