const Discord = require('./../src/index.js')
require('dotenv').config({ path : './test/.env' })

const bot = new Discord.Bot({
    intents: 'all',
    mobile: true
})

const CH = new Discord.CommandHandler('./test/Commands', bot)
module.exports.CH = CH

bot.registerCommand({
    name: 'ping',
    async execute(message, args, b) {
        message.channel.send('PONG')
    }
})

bot.login({
    prefix: '!',
    token: process.env.TOKEN,
    config: {
        unknownCmdMessage: 'Unknown Command!',
        errorMessage: 'ERROR'
    }
})