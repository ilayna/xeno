import { REST, Routes } from 'discord.js';
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'
config();


const token = process.env['DISCORD_TOKEN'];
const client_id = process.env['DISCORD_CLIENT_ID'];
const guild_id = '795209701935153153'
if (!token || !client_id) {
    console.log('token or client id not found ! please set environment variables !');
    process.exit(0);
}

const rest = new REST({ version: '10' }).setToken(token);

const applicationCommands = new Array();
const applicationCommandsPath = path.join(__dirname, 'commands', 'application')
const applicationCommandsFiles = fs.readdirSync(applicationCommandsPath).filter((file) => file.endsWith('.ts'));
console.log(`Application Commands dir ${applicationCommandsPath} `);

for (const file of applicationCommandsFiles) {
	const filePath = path.join(applicationCommandsPath, file);
	const command = require(filePath);
	applicationCommands.push(command.data.toJSON());
}

const guildCommands = new Map<string,Array<any>>(); //guild_id:string : commands:array(any)
const guildsPath = path.join(__dirname, 'commands', 'guild');
const guilds = fs.readdirSync(guildsPath);
for (const guild_id of guilds) {
	const guild_commands = () => {
		const commands = new Array();
		const pathToGuildCommands = path.join(guildsPath, guild_id);
		for (const file of fs.readdirSync(pathToGuildCommands).filter(x => x.endsWith('.ts'))) {
			const filePath = path.join(pathToGuildCommands, file);
			const command = require(filePath);
			commands.push(command.data.toJSON());
		}
		return commands;
	};
	guildCommands.set(guild_id, guild_commands());
}




(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
        
		await rest.put(Routes.applicationCommands(client_id), { body: applicationCommands });
		for (const guild_id of guildCommands.keys()) {
			await rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: guildCommands.get(guild_id) })
		}
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();