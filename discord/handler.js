var { Client } = require("discord.js")
var fs = require("fs")

/**
 * @param {Client} client 
 */

module.exports = async (client) => {

    var commands = []

    var eventFolder = fs.readdirSync(__dirname + "/events").filter(f => f.endsWith(".js"))
    eventFolder.map(file => require(`./events/${file}`))

    var commandsFolder = fs.readdirSync(__dirname + "/commands").filter(f => f.endsWith(".js"))
    commandsFolder.map(f => {
        var file = require(`./commands/${f}`)
        if (!file?.name) return
        if (file?.options.length == 0) delete file.options

        client.commands.set(file.name, file)
        commands.push(file);
    })



    client.on("ready", async () => {
        await client.application.commands.set(commands)
    })


}
