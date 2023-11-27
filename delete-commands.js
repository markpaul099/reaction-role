const { REST, Routes } = require("discord.js");

// Load config
require("dotenv").config();

const rest = new REST({ version: 10 }).setToken(process.env.token);

// for global commands
rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
	.then(() => console.log("Successfully deleted all application commands."))
	.catch(console.error);