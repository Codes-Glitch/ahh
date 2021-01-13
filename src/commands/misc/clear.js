
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'clear',
                description: 'clear commands',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'clear <...count>',
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
      message.delete().catch(O_o=>{}); // eslint-disable-line

	
      let cr = args[0]
      if(!cr)return message.reply("How many message will you clear ?").then(m=>m.delete({timeout:5000}).catch(e=>{}))
      if(isNaN(cr))return message.reply("this is not a number").then(m=>m.delete({timeout:10000}).catch(e=>{}))
      //if(cr > 200)return message.reply("you can only clear message 200").then(m=>m.delete({timeout:5000}).catch(e=>{}))
      if(cr < 1)return message.reply("you must clear more than one").then(m=>m.delete({timeout:5000}).catch(e=>{}))
       return message.channel.bulkDelete(cr)
       return message.reply(`has been clear ${cr} message`)
    }
}