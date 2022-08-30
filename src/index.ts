import { Client, Collection, GatewayIntentBits, GuildMember } from 'discord.js';
import * as path from "node:path"
import * as fs from "node:fs"

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

import { config } from 'dotenv'
config();

const token = process.env['DISCORD_TOKEN'];
const commands = new Collection();
//set commands
const getAllCommands = () => {
    const commandsFoldersPath = path.join(__dirname, 'commands')
    for (const folder of fs.readdirSync(commandsFoldersPath, { withFileTypes: true }).filter(x => x.isDirectory())) {
        const folderPath = path.join(commandsFoldersPath, folder.name);
        for (const file of fs.readdirSync(folderPath).filter(x => x.endsWith('.ts'))) {
            const command = require(path.join(folderPath, file));
            commands.set(command.data.name, command);
        }
        for (const dir of fs.readdirSync(folderPath, { withFileTypes: true }).filter(x => x.isDirectory())) {
            const dirfoldername = path.join(folderPath, dir.name);
            for (const innerFile of fs.readdirSync(dirfoldername).filter(x => x.endsWith('.ts'))) {
                const filefullpath = path.join(dirfoldername, innerFile);
                const command_ = require(filefullpath);
                commands.set(command_.data.name, command_);
            }
        }
    }
}

getAllCommands();


if (!token) {
    console.log('token not found ! please set environment variables !');
    process.exit(0);
}

client.on('ready', () => {
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command: any = commands.get(interaction.commandName);

    if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('guildMemberAdd', async (member: GuildMember) => {
    if (member.guild.id == '879482564212056064') {
        const memberRole = await member.guild.roles.fetch('879637214580068353');
        if (memberRole) {
            member.roles.add(memberRole)
        }        
    } //id = wabulu's server (mine)    
});


client.login(token);