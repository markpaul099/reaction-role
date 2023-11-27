const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("editembed")
		.setDescription("Edit an already sent embed")
		.addChannelOption(option =>
			option
				.setName("channel")
				.setDescription("The channel where the embed message is located.")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText))
		.addStringOption(option =>
			option
				.setName("message")
				.setDescription("The ID of the embed message.")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("title")
				.setDescription("Embed Title"))
		.addStringOption(option =>
			option
				.setName("color")
				.setDescription("Embed color (#hex)"))
		.addStringOption(option =>
			option
				.setName("description")
				.setDescription("Text inside the embed"))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		const channelName = interaction.options.getChannel("channel");
		const msgId = interaction.options.getString("message");
		const title = interaction.options.getString("title");
		const description = interaction.options.getString("description").replace(/\\n/g, "\r\n");
		const color = interaction.options.getString("color");

		const channel = await interaction.guild.channels.cache.get(channelName.id);
		const message = await channel.messages.fetch(msgId);

		const embed = EmbedBuilder.from(message.embeds[0])
			.setTitle(title)
			.setColor(color)
			.setDescription(description);

		message.edit({ embeds: [embed] });
		await interaction.reply("Edited the embed.");
		setTimeout(() => interaction.deleteReply(), 5000);
	},
};
