const { MessageEmbed } = require('discord.js');

const statusMessages = {
	WAITING: {
		text: '📊 Waiting for community feedback, please vote!',
		color: 0xffea00,
	},
	ACCEPTED: {
		text: '✅ Accepted idea! Expect this soon.',
		color: 0x34eb5b,
	},
	DENIED: {
		text: '❌ Thank you for the feedback, but we are not interested in this idea at this time.',
		color: 0xc20808,
	},
};

module.exports = (client) => {
	client.on('messageCreate', (message) => {
		const { guild, channel, content, member } = message;

		const suggestionChannelId = '953057791021551666';
		if (suggestionChannelId === channel.id && !member.user.bot) {
			message.delete();

			const status = statusMessages.WAITING;

			const embed = new MessageEmbed()
				.setColor(status.color)
				.setAuthor({
					name: member.displayName,
					iconURL: member.user.displayAvatarURL(),
				})
				.setDescription(content)
				.addField('status', status.text)
				.setFooter({
					text: 'Want to suggestion something? Simply type it in this channel.',
				});

			channel
				.send({
					embeds: [embed],
				})
				.then((message) => {
					message.react('👍').then(() => {
						message.react('👎');
					});
				});
		}
	});
};

module.exports.statusMessages = statusMessages;
