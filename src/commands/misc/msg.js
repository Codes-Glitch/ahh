
const Discord = require('discord.js');
const ms = require('ms');
const Member = require('../../classes/GuildMember');
const Warning = require('../../modules/Warning');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'msg',
                description: 'msg DM',
                permission: 'Server Moderator',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 10,
                nsfwCommand: false,
                args: true,
                usage: 'msg <User> [msg...]',
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
        const [user, ...reason] = args;
        const target = await client.resolveUser(user);
        /*if (!target || target.bot) {
            *return message.channel.send(new Discord.MessageEmbed()
              *  
                *.setColor('RED')
                *.setDescription(`Incorrect Usage, the correct usages are:\n\`${this.options.usage}\``)
                *.setTimestamp()
                *.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            *);
        }*/
        if (target.equals(message.author)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setDescription(`Hey there, You can't warn yourself :P`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        const member = message.guild.member(target);
        if (member) {
            if (message.author.id !== message.guild.ownerID && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription('You can\'t msg member who has a higher or equal to your highest role.')
                );
            }
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`You can't msg a user that is not on this server. Or that user doesn't exist`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            );
        }
        
        const duration = reason[1] ? ms(reason[1]) : false;
        if (duration) reason.shift();
        const _reason = reason ? reason.join(' ') : 'No reason provided.';
        const instance = new Member(target.id, message.guild.id);
        try {
            const stat = await instance.warnings.add({
                reason: _reason,
                issued_by: `${message.author.tag} / ${message.author.id}`,
            });
            if (!stat) throw 'error';
            if (duration && !isNaN(duration)) {
                setTimeout(() => {
                    instance.warnings.remove(stat);
                }, Number(duration));
            }
            message.channel.send(`Successful msg members ${target}`).then(m=>m.delete({timeout:10000}).catch(e=>{}))
        } catch (e) {
            return message.channel.send('Member was not warned. unexpected error occured.').then(m=>m.delete({timeout:10000}).catch(e=>{}))
        }
        /*const modChannel = await client.channels.fetch(message.guild.db.moderation('modlog')).catch(() => { });
        *if (modChannel) {
            *modChannel.send(new Discord.MessageEmbed()
                *.setColor('RANDOM')
                *.setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
                *.setTimestamp()
                *.setThumbnail(target.displayAvatarURL({ dynamic: true }) || null)
                *.setDescription(`**Member** : ${target.tag} / ${target.id}\n**Action** : Warn\n**Reason** : ${_reason}\n${duration ? `**Length** : ${ms(duration)}` : ''}`)
            *);
        }*/
        try {
            const dm = await target.createDM();
            await dm.send(new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`**${target}**\n**=> ${_reason}**\n\n**Server: ${message.guild.name}**`)
                //.setTimestamp()*/
                //.setTitle(`__📩 ${message.guild.name} 📩__`)
                //.setDescription(`__\n__**MESSAGE : ${_reason}**\n**\n**`)//\n\n**Author : ${message.author.tag} **\n**ID : ${message.author.id}**`)
                //.setFooter(`AUTHOR : ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }) || message.guild.iconURL())
            );
        } catch (e) {

        }
        await Warning(client, message, target.id, member);
    }
}