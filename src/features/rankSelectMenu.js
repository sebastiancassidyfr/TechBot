module.exports = (client) => {
	client.on('interactionCreate', (interaction) => {
		if (!interaction.isSelectMenu()) {
			return;
		}

		const { customId, values, member } = interaction;

		if (customId === 'auto_roles') {
			const component = interaction.component;
			const removed = component.options.filter((option) => {
				return !values.includes(option.value);
			});

			for (const id of removed) {
				member.roles.remove(id.value);
			}

			for (const id of values) {
				member.roles.add(id);
			}

			interaction.deferUpdate();
			interaction.user.send({
				content: `Your rank has been updated! Adding the role to your profile can take up to 10 seconds.`,
			});
		}
	});
};
