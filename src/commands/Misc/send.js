module.exports = {
	commands: 'send',
	minArgs: 2,
	expectedArgs: '<channel> <message>',
	permissions: 'ADMINISTRATOR',
	callback: async (message, args) => {
		const { guild } = message;

		const channel = message.mentions.channels.first();
		if (!channel) {
			message.reply('Please tag a text channel as your first argument.');
			return;
		}

		args.shift(); // Taking the channel out of the array

		const msg = args.join(' ');
		await channel.send(msg);
	},
};
