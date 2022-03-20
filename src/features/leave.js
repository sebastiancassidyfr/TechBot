const { updateMembers } = require('../functions/member-count');

module.exports = (client) => {
	client.on('guildMemberRemove', (member) => {
		updateMembers(member.guild);
	});
};
