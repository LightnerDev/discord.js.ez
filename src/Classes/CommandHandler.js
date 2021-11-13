const fs = require('fs')
const chalk = require('chalk')
var PATH = require('path')

module.exports = class {
    constructor(path, bot) {
        if (!path) throw new Error('path parameter missing')
        if (!bot) throw new Error('bot parameter missing')

        this.path = path
        this.bot = bot

        if (!PATH.isAbsolute(this.path)) this.path = PATH.resolve(this.path);

        this.reloadCommands = this.reloadCommands.bind(this)

        this.reloadCommands()
    }

    async _read(dir, done, tthis) {
        var results = [];
        fs.readdir(dir, function (err, list) {
            if (err) return done(err);
            var i = 0;
            (function next() {
                var file = list[i++];
                if (!file) return done(null, results);
                file = PATH.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        tthis._read(file, function (err, res) {
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        results.push(file);
                        next();
                    }
                });
            })();
        });
    }

    async reloadCommands() {
        console.log(chalk.yellow('Reloading commands!'))

        let cmdC = this.bot.Client.commands

        this._read(this.path, function (err, results) {
            if (err) throw err;
            results.forEach(e => {
                if (!e.endsWith('.js')) return;

                delete require.cache[require.resolve(e)];

                let cmd = require(e)

                cmdC.set(cmd.name, cmd)

                if (cmd.aliases) {
                    console.log(chalk.green('Loaded commands: ') + chalk.blue(e) + ' : ' + chalk.cyan(`${cmd.name} , ` + cmd.aliases.join(' , ')))
                } else {
                    console.log(chalk.green('Loaded commands: ') + chalk.blue(e) + ' : ' + chalk.cyan(`${cmd.name}`))
                }
            });

            console.log(chalk.green('Commands reloaded!'))
        }, this);
    }
}