const { MessageEmbed } = require('discord.js');
const { statusMessages } = require('../../features/suggestion');

module.exports = {
	commands: ['suggestion', 's'],
	minArgs: 3,
	expectedArgs: '<messageId> <status> <reason>',
	requiredRoles: ['Moderator', 'Administrator', 'Owner'],
	callback: async (message, args) => {
		const channelId = '953057791021551666';
		const channel = message.guild.channels.cache.get(channelId);
		if (!channel) {
			message.reply(
				`The suggestion channel no longer exists. Please contact a server administrator.`
			);
			return;
		}

		const messageId = args.shift();

		let targetMessage;
		try {
			targetMessage = await channel.messages.fetch(messageId, {
				cache: false,
				force: true,
			});
		} catch (e) {
			message.reply(`Message with the ID "${messageId}" doesn't exist.`);
			return;
		}

		const status = args.shift().toUpperCase();
		const newStatus = statusMessages[status];
		if (!newStatus) {
			message.reply(
				`Unknown status "${status}", please use ${Object.keys(statusMessages)}`
			);
			return;
		}

		const reason = args.join(' ');

		const oldEmbed = targetMessage.embeds[0];

		const embed = new MessageEmbed()
			.setAuthor({
				name: oldEmbed.author.name,
				iconURL: oldEmbed.author.iconURL,
			})
			.setDescription(oldEmbed.description)
			.setColor(newStatus.color)
			.setFooter({
				text: 'Want to suggestion something? Simply type it in this channel.',
			})
			.addField(
				'status',
				`${newStatus.text}${
					reason.toLowerCase() == 'none' ? '' : ` Reason: ${reason}`
				}`
			);

		targetMessage.edit({
			embeds: [embed],
		});

		message.reply(`Status Updated.`);
	},
};
