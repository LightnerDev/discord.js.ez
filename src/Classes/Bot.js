const Discord = require('discord.js')
const chalk = require('chalk')

module.exports = class {
    constructor(options) {
        if (!options) throw new Error('options parameter missing')
        if (!options.intents) throw new Error('options.intents parameter missing')

        if (options.intents.toLowerCase() == 'all') {
            this.intents = new Discord.Intents(32767)
        } else if (typeof options.intents == 'number') {
            this.intents = new Discord.Intents(options.intents)
        } else throw new Error('options.intents value not recognized\nPlease note that due to this being a new package, the options for intents are very limited!')

        if (typeof options.mobile == 'boolean') {
            if (options.mobile) {
                this.mobile = true
            } else {
                this.mobile = false
            }
        }

        this.Client = new Discord.Client({
            intents: this.intents,
            ws: {
                properties: {
                    $browser: this.mobile == true ? 'Discord Android' : 'Discord Desktop'
                }
            }
        })

        this.Client.commands = new Discord.Collection()
    }

    login(options) {
        if (!options) throw new Error('options parameter missing')
        if (!options.prefix) throw new Error('options.prefix parameter missing')
        if (!options.token) throw new Error('options.token parameter missing')
        
        this.token = options.token
        this.prefix = options.prefix
        this.unknownCmdMessage = options.config.unknownCmdMessage
        this.errorMessage = options.config.errorMessage

        this.Client.login(this.token)

        this.Client.on('ready', async () => {
            console.log('Ready on client: ' + this.Client.user.tag)
        })

        this.Client.on('messageCreate', async (message) => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;

            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            let cmd = this.Client.commands.get(command) || this.Client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

            if (cmd) {
                try {
                    await cmd.execute(message, args, this.Client)
                } catch (error) {
                    console.log(chalk.red('An error occured! \n') + error)

                    message.reply({
                        content: typeof this.errorMessage == 'string' ? this.errorMessage : "There was an error executing that command!",
                        allowedMentions: { repliedUser: false }
                    })
                }
            } else {
                if (!this.unknownCmdMessage) return;
                message.reply({
                    content: this.unknownCmdMessage,
                    allowedMentions: { repliedUser: false }
                })
            }
        })
    }

    registerCommand(cmd) {
        if (!cmd) throw new Error('cmd parameter missing')
        if (!cmd.name || typeof cmd.name != 'string') throw new Error('cmd.name parameter missing or isn\'t type `STRING`')
        if (!cmd.execute || typeof cmd.execute != 'function') throw new Error('cmd.execute parameter missing or isn\'t type `FUNCTION`')

        this.Client.commands.set(cmd.name, cmd)
    }
}