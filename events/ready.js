const { Events, ActivityType } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`
------------------------------------------------------
> Logging in...
------------------------------------------------------
Logged in as ${client.user.tag}
Working on ${client.guilds.cache.size} servers!
${client.channels.cache.size} channels and ${client.users.cache.size} users cached!
------------------------------------------------------
------------------------------------------------------
--------------------Bot by markpaul-------------------
------------------------------------------------------
------------------------------------------------------
`);
		// Set Bot's Pressence/Activity
		setInterval(() => {
			const list = [
				{ type: ActivityType.Watching, name: "for /help" },
				{ type: ActivityType.Watching, name: `For reactions` },
			];
			const index = Math.floor(Math.random() * list.length);
			client.user.setPresence({ activities: [{ name: list[index].name, type: list[index].type }], status: "online" });
		}, 10000);
	},
};
