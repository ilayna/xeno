import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Get your roles here !'),
	async execute(interaction: any) {
		await interaction.reply('Added {role} to user');
	},
};