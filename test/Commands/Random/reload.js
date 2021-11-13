const CH = require('./../../test.js').CH

module.exports = {
    name: 'reload',
    aliases: ['reload', 'reloadcmd'],
    async execute(message, args, b) {
        if (message.author.id == '808368246600368169') {
            await CH.reloadCommands()
            message.react(`✅`)
        } else {
            message.reply('nono')
            message.react(`❌`)
        }
    }
}