import { EventHandler, EVENT } from "./handler/EventHandler";
import Database from './handler/Database';

const Discord = require('discord.js');
const client = new Discord.Client()

client.cache = {
    guild: new Map<string, any>(),
    user: new Map<string, any>()
}

Database.GuildModel

client.on("*", function (this: any) {
    EventHandler.handle(client, this.event, [...arguments])
})



client.login("NjcwNTc4NjA1MjEzODc2MjM2.Xrvy3w.UDy6kKHXWZewUvkLDlaJwfF5dtM")