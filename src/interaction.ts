import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Request, Response } from 'express';
import logger from './logger';

export const interaction = (req: Request, res: Response): any => {
	const { type, data } = req.body;

	if (type === InteractionType.PING) {
		return res.status(200).json({ type: InteractionResponseType.PONG });
	}

	logger.info(req.body);

	if (type === InteractionType.APPLICATION_COMMAND) {
		const { name } = data;

		if (name === 'link') {
			return res.send({
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
	}

	return res.status(400).json(null);
};
