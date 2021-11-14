# @lightner/discord.js.ez

## Intro

Heyy! You're probably my friends! If not, then thanks for coming here! This package is fairly new, and can barely do anything!
    - Lightner#5294

## Docs

### Requirements

`NodeJS` `>=16.6.0`

### Getting Started

You first have to install the module

```sh-session
npm install discord.js.ez@github:LightnerDev/discord.js.ez
```

Then create `index.js`

Then you have to require the module

```js
const Discord = require('discord.js.ez')
```

Then you have to declare a new bot

```js
const bot = new Discord.Bot({
    intents: Number || 'all', //Number is used for custom intents; See: https://ziad87.net/intents/
    mobile: true //Whether to show mobile status or not
})
```

Then you have to register a command

```js
bot.registerCommand({
    name: 'name-of-command', //no spaces allowed
    async execute(message, args, bot) {
        message.channel.send('a reply to the command')
    }
})
```

Then you have to login

```js
bot.login({
    prefix: '!', //prefix to use
    token: process.env.TOKEN, //token
    config: {
        unknownCmdMessage: 'Unknown Command!', //if the command isnt recognized but the prefix is (null for no message)
        errorMessage: 'ERROR' //if the command creates error during execution (null for default; doesn't catch all errors)
    }
})
```

### Command Handler

Initiate the command handler with the following code

```js
const CH = new Discord.CommandHandler('./test/Commands', bot) //replace './test/Commands' with the directory you commands are in; bot is the bot you initiated in the code
module.exports.CH = CH //Used to export the CommandHandler
```

In the directory above you want to make files (or sub-folders/sub-sub-folder) and put the following

```js
module.exports = {
    name: 'name-of-command', //no spaces allowed
    async execute(message, args, bot) {
        message.channel.send('a reply to the command')
    }
}
```

To make a reload commands command put the following

```js
const CH = require('./../../index.js').CH //edit `./../../index.`js` depending on the relative positions of this file and `index.js`

module.exports = {
    name: 'reload',
    async execute(message, args, b) {
        if (message.author.id == 'YOUR_ID_HERE') {
            await CH.reloadCommands()
            message.react(`✅`)
        } else {
            message.reply('nono')
            message.react(`❌`)
        }
    }
}
```

### Aliases

Did you know aliases are also supported?

To do them you have to put
```js
aliases: ['alias1', 'alias2', 'alias3' ...],
```
in the code right after (it doesn't matter but just of simplicity)
```js
name: 'name-of-command'
```

## Some other stuff

Report bugs @ https://github.com/LightnerDev/discord.js.ez/issues

Look at an example @ https://github.com/LightnerDev/discord.js.ez/tree/master/test

# End

Thanks for reading!!! - Lightner#5294

---
