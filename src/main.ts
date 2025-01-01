import express from 'express';

import { VerifyDiscordRequest } from './request';
import logger from './logger';
import { interaction } from './interaction';
import { config } from './config';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ verify: VerifyDiscordRequest(config.PUBLIC_KEY) }));

logger.info(config);

app.post('/interactions', interaction);

app.listen(PORT, () => {
	logger.info(`Listening on port: ${PORT}`);
});
