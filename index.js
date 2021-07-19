const Discord = require('discord.js');

const ms = require('ms');
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});

const fs = require('fs');
bot.commands = new Discord.Collection();

bot.on('ready', () => {
    console.log('Bot online');
    fs.readdir("./commands", (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() == 'js');

        if (jsfile.length == 0) return console.log('Could not find any commands');

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);
        })
    })
})

let prefix = '~';

bot.on('message', (message) => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length);
    let args = MessageArray.slice(1);

    var Black = '#800080';
    var White = '#FFFFFF';

    if (!message.content.startsWith(prefix)) return;

    if (cmd == "change")
    {
        if (args[0] == 'prefix')
        {
            prefix = args.slice(1);
            message.channel.send('Prefix changed to ' + prefix);
        }
    }

    let commandfile = bot.commands.get(cmd);
    if (commandfile) {commandfile.run(bot, message, args)};
})

bot.on('channelCreate', (channel) => {
    channel.send('Channel made');
})

bot.on('guildMemberUpdate', (oldMember, newMember) => {
    if (newMember.nickname !== oldMember.nickname){
        newMember.send('Name changed');
    }
})

bot.on('guildMemberAdd', (member) => {
    let embed = new Discord.MessageEmbed()
    .setTitle('Welcome to my server')
    .setDescription(`Thank you for joining this server!\nMake sure to be polite with the other members\n Current Member count: ${member.guild.memberCount}`)
    .setColor('#66FF00')
    .setThumbnail(member.user.avatarURL());

    member.send(embed);
})

bot.login("ODY2NDIxMTMyNzMwMDQwMzQw.YPSTjw.xoVcmXkcoh1piCBOEzzUVGLtkqU");
