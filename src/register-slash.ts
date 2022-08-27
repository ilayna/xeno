import { REST, Routes } from 'discord.js';

import { config } from 'dotenv'
config();

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

const token = process.env['DISCORD_TOKEN'];
const client_id = process.env['DISCORD_CLIENT_ID'];
const guild_id = '795209701935153153'
if (!token || !client_id) {
    console.log('token or client id not found ! please set environment variables !');
    process.exit(0);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
        
		//await rest.put(Routes.applicationCommands(client_id), { body: commands });
        await rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();