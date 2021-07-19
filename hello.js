exports.run = async(bot, message, args) =>
{
    const Discord = require('discord.js');
    let color = args.slice(0);
    let messages = args.slice(1).join(' ');
    let embed = new Discord.MessageEmbed()
    .setTitle(`DDamp sais:`)
    .setDescription(messages)
    .setColor(color)

    message.channel.send(embed);
}

exports.help =
{
    name: 'say'
}