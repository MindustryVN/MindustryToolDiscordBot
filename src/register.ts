import axios from 'axios';
import { config } from './config';

const commandData = {
	name: 'preview',
	description: 'Generate schematic, map preview',
	type: 1, // Slash command type
	integration_types: [0, 1],
	context: [0, 1, 2],
	options: [
		{
			type: 11, // The type for a file/attachment
			name: 'file', // The name of the file parameter
			description: 'Preview file (.msch, .msavm .txt)',
			required: true, // Make it required
		},
	],
};

axios
	.post(`https://discord.com/api/v10/applications/${config.APP_ID}/commands`, commandData, {
		data: commandData,
		headers: {
			Authorization: `Bot ${config.APP_TOKEN}`,
			'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
		},
	})
	.then((response: any) => {
		console.log('Command registered:', response.data);
	})
	.catch((error: any) => {
		console.error('Error registering command:', error);
	});
