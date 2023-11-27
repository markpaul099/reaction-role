const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addreaction")
		.setDescription("Add reaction to a comment")
		.addChannelOption(option =>
			option
				.setName("channel")
				.setDescription("The ID of the Channel Where the Message is Located")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText))
		.addStringOption(option =>
			option
				.setName("message")
				.setDescription("The ID of the Message to Add Reaction")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("reaction")
				.setDescription("Reaction to Add")
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		try {
		const channelName = interaction.options.getChannel("channel");
		const msgId = interaction.options.getString("message");
		const Reaction = interaction.options.getString("reaction");

		const channel = await interaction.guild.channels.cache.get(channelName.id);
		const message = await channel.messages.fetch(msgId);

		await message.react(Reaction);
		await interaction.reply("added raction");
		setTimeout(() => interaction.deleteReply(), 5000);
		} catch(err) {
			console.log(err)
		  }
	},
};