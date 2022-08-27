import { Client, GatewayIntentBits, GuildMember } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

import { config } from 'dotenv'
config();

const token = process.env['DISCORD_TOKEN'];

if (!token) {
    console.log('token not found ! please set environment variables !');
    process.exit(0);
}

client.on('ready', () => {
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
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