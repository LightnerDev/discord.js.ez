module.exports = {
    name: 'random-number',
    async execute(message, args, b) {
        if (args.length != 2) { message.reply({ content : 'There must be 2 args\nExample: `!random-number 13 50`' , allowedMentions: { repliedUser: false } }); return; }
        message.reply({ content : (Math.round(Math.random() * (args[1] - args[0]) + args[0])).toString() , allowedMentions: { repliedUser: false } })
    }
}