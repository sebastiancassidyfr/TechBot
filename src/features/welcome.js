module.exports = (client) => {
	client.on('guildMemberAdd', (member) => {
		const welcomeChannelId = '953101421870469160';
		const rulesChannelId = '953101583137251458';
		const channel = member.guild.channels.cache.get(welcomeChannelId);
		if (!channel) {
			throw new Error('There is no welcome channel');
		}
		channel.send(
			`Please welcome our newest member, <@${member.id}> to our server! Make sure you read the <#${rulesChannelId}>. Please Enjoy!`
		);
	});
};
