const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("embed")
		.setDescription("Add reaction to a comment")
		.addChannelOption(option =>
			option
				.setName("channel")
				.setDescription("The channel where to send embed")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText))
		.addStringOption(option =>
			option
				.setName("content")
				.setDescription("Text inside the embed"))
		.addStringOption(option =>
			option
				.setName("title")
				.setDescription("Embed Title"))
		.addStringOption(option =>
			option
				.setName("color")
				.setDescription("Embed color (hex)"))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		const channelName = interaction.options.getChannel("channel");
		const content = interaction.options.getString("content");
		const color = interaction.options.getString("color");
		const title = interaction.options.getString("title");

		const channel = await interaction.guild.channels.cache.get(channelName.id);
		const embed = new EmbedBuilder()
			.setTitle(title)
			.setColor(color)
			.setDescription(content);

		await channel.send({ embeds: [embed] });
		await interaction.reply("embed sent.");
		setTimeout(() => interaction.deleteReply(), 5000);
	},
};
