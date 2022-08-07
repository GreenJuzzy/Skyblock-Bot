var Discord = require("discord.js")
var { GatewayIntentBits } = require("discord.js")
var client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans] })
var dotenv = require("dotenv")

dotenv.config()

client.commands = new Discord.Collection()

module.exports = client

require("./handlers")(client)

client.login(process.env.token)

process.stdin.on("data", async (data) => {
    var data = data.toString().trim()
    try {
        var evaled = await eval(data)
        console.log(evaled)
    } catch (error) {
        console.log(error)
    }
})