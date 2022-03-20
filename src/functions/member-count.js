const updateMembers = (guild) => {
	const channelId = '954599379682086964';
	const channel = guild.channels.cache.get(channelId);
	channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
};

module.exports.updateMembers = updateMembers;
