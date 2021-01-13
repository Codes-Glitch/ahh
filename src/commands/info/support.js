const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'dashboard',
                description: 'Dashboard',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: ["EMBED_LINKS"],
                cooldown: 5,
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
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setAuthor("⬇️Link Dashboard⬇️")
            .setDescription(`[Clink Here](https://dashboard-cod.glitch.me)`)
            
            );
    }
}