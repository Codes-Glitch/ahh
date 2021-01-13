const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'createchnd',
                description: 'create Channel and category',
                permission: 'Server Administrator',
            },
            options: {
                aliases: [],
                clientPermissions: ['MANAGE_CHANNELS', 'MOVE_MEMBERS'],
                cooldown: 10,
                nsfwCommand: false,
                args: false,
                usage: '',
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
        const response = await client.awaitReply(message, 'Please give the name of category\n\nType `cancel` to cancel this command', 20000, true) //Asks for a category to set DVC In
        if (!response) return message.channel.send('No response was given, Exiting setup...'); //Stops execution if no response
        if (response.content === 'cancel') return message.channel.send('Exiting setup...'); //Stops execution if command cancel is run
        const channel = await message.guild.channels.create(response.content, { type: 'category' });
        let response1 = await client.awaitReply(message, 'Please give the name of Channel\n\nType `cancel` to cancel this command', 20000, true) //Asks for a category to set DVC In
        if (!response1) return message.channel.send('No response was given, Exiting setup...') //Stops execution if no response
        if (response1.content === 'cancel') return message.channel.send('Exiting setup...') //Stops execution if command cancel is run
        const chan = await message.guild.channels.create(`${response1}`, { type: 'channel', parent: channel });
        return message.channel.send('success');

    
        }
}