import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Request, Response } from 'express';
import logger from './logger';

export const interaction = (req: Request, res: Response) => {
	const { type, data } = req.body;

	switch (type) {
		case InteractionType.PING: {
			res.json({ type: InteractionResponseType.PONG });
			break;
		}

		case InteractionType.APPLICATION_COMMAND: {
			const { name } = data;

			logger.info(req.body);
			if (name === 'link') {
				res.json({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: 'Authorize your Quests of Wumpus account with your Discord profile.',
						components: [
							{
								type: 1,
								components: [
									{
										type: 2,
										label: 'Link Account',
										style: 5,
										// If you were building this functionality, you could guide the user through authorizing via your game/site
										url: 'https://discord.com/developers/docs/intro',
									},
								],
							},
						],
					},
				});
			}
			break;
		}

		default: {
			logger.info(`Invalid type: ${type}`);
			res.status(400).json(null);
		}
	}
};
