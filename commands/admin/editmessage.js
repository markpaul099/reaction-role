const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("editmessage")
		.setDescription("Edit an already sent message")
		.addChannelOption(option =>
			option
				.setName("channel")
				.setDescription("The channel where the message is located.")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText))
		.addStringOption(option =>
			option
				.setName("message")
				.setDescription("The ID of the message.")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("content")
				.setDescription("Content of message")
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		const channelName = interaction.options.getChannel("channel");
		const msgId = interaction.options.getString("message");
		const description = interaction.options.getString("content").replace(/\\n/g, "\r\n");

		const channel = await interaction.guild.channels.cache.get(channelName.id);
		const message = await channel.messages.fetch(msgId);

		message.edit(description);
		await interaction.reply("Edited the message.");
		setTimeout(() => interaction.deleteReply(), 5000);
	},
};
