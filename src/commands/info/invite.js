const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'invite',
                description: 'Invite Your Bot',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ["EMBED_LINKS"],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const prefix = message.guild.db.settings('prefix');
      message.delete().catch(O_o=>{}); // eslint-disable-line

	
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setAuthor("⬇️Link My Bot⬇️")
            .setDescription(`
            [Clink Here](https://discord.com/api/oauth2/authorize?client_id=781825500410019861&scope=bot&permissions=8)`)
            
            );
    }
}