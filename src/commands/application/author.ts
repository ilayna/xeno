import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('xeno by wabulu')
	.setURL('https://github.com/wabulu/xeno')
	.setAuthor({ name: 'Ilay Nahman', iconURL: 'https://avatars.githubusercontent.com/u/58913586?v=4', url: 'https://github.com/wabulu' })
	.setDescription('I am xeno ! A friendly little discord bot !')
	.setTimestamp();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('author')
		.setDescription('See information about the author of this bot !'),
	async execute(interaction: any) {
		await interaction.reply({embeds: [embed]});
	},
};
// at the top of your file

// inside a command, event listener, etc.
