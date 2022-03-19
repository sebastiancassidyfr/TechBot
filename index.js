const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const { Intents } = Discord;
const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

require('dotenv').config();

const welcome = require('./src/features/welcome');
const suggestion = require('./src/features/suggestion');
const rankSelectMenu = require('./src/features/rankSelectMenu');

client.on('ready', async () => {
	console.log('TechBot#7571 is now Online!');

	const baseFile = 'command-base.js';
	const commandBase = require(`./src/${baseFile}`);

	const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(`${__dirname}/src`, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(`${__dirname}/src`, dir, file));
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));
			} else if (file !== baseFile) {
				const option = require(path.join(`${__dirname}/src`, dir, file));
				commandBase(option);
			}
		}
	};

	readCommands('commands');

	commandBase.listen(client);

	welcome(client);
	suggestion(client);
	rankSelectMenu(client);
});

client.login(process.env.TOKEN);
