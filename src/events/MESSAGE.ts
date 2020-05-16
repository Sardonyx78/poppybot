import { DiscordEvent } from './DiscordEvent'
import { EVENT } from '../handler/EventHandler'
import { Client, Message, Collection } from 'discord.js';
import { Command, Perms } from '../commands/Command';
import { readdirSync } from 'fs';
import { matchArguments, checkPermission } from '../Utils';
import Database from '../handler/Database';

const Commands = new Collection<string, Command>();



readdirSync("./src/commands").forEach((f: string) => {
    if (f === "Command.ts") return
    const cmd = new (require(`../commands/${f}`));
    Commands.set(cmd.name, cmd)
})




module.exports = class MESSAGE_EVENT implements DiscordEvent {
    event: EVENT
    constructor() {
        this.event = EVENT.message
    }

    async handle(client: Client, message: Message) {
        if (message.channel.type !== "dm") {
            if (client.cache.guild.has(message.guild.id)) {
                const guild = client.cache.guild.get(message.guild.id)
                if (!message.content.startsWith(guild.prefix)) return
                
                const rawArgs = message.content.split(" ")

                if (Commands.has(rawArgs[0].substr(guild.prefix.length))) {
                    const command = Commands.get(rawArgs[0].substr(guild.prefix.length))


                    rawArgs.shift()
                    
                    if (command.permissions.includes(Perms.BOT_OWNER) && message.member.id !== "295222772546928641") return



                    if (!checkPermission(command, message.member)) return

                    command.handle(client, guild, message, !(command.info.usage.override) ? matchArguments(command.info.usage.args, rawArgs) : rawArgs)
                }
            } else {
                client.cache.guild.set(message.guild.id, await Database.GuildModel.findOne({ guildid: message.guild.id }))
                this.handle(client, message)
            }
        }
    }
}