const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	commands: 'addrole',
	minArgs: 3,
	expectedArgs: '<channel> <messageId> <role>',
	permissions: 'ADMINISTRATOR',
	callback: async (message, args, text, client) => {
		const channel = message.mentions.channels.first();
		if (!channel) {
			message.reply('Please tag a text channel as your first argument.');
			return;
		}

		args.shift(); // taking the channel out of the array

		const messageId = args.shift();

		let role = message.mentions.roles.first();
		try {
			role = message.channel.guild.roles.cache.find((r) => r.id === role.id);
		} catch (e) {
			message.reply(`Unknown role "${role}".`);
			return;
		}

		let targetMessage;

		try {
			targetMessage = await channel.messages.fetch(messageId, {
				cache: true,
				force: true,
			});
		} catch (e) {
			message.reply(`Unknown message ID "${messageId}"`);
			return;
		}

		if (targetMessage.author.id !== client.user.id) {
			message.reply(
				`Please provide a message ID that was sent from <@${client.user.id}>`
			);
			return;
		}

		let row = targetMessage.components[0];
		if (!row) {
			row = new MessageActionRow();
		}

		const option = [
			{
				label: role.name,
				value: role.id,
			},
		];

		let menu = row.components[0];
		if (menu) {
			for (const o of menu.options) {
				if (o.value === option[0].value) {
					message.reply(`<@${o.value}> is already part of this menu.`);
					return;
				}
			}

			menu.addOptions(option);
		} else {
			row.addComponents(
				new MessageSelectMenu()
					.setCustomId('auto_roles')
					.setMinValues(0)
					.setMaxValues(1)
					.setPlaceholder('Select your rank...')
					.addOptions(option)
			);
		}

		targetMessage.edit({
			components: [row],
		});
	},
};
