import { Client } from "discord.js"
import { DiscordEvent } from "../events/DiscordEvent"
import { Logger } from '../Utils'

export enum EVENT {
    channelCreate = "channelCreate",
    channelDelete = "channelDelete",
    channelPinsUpdate = "channelPinsUpdate",
    channelUpdate = "channelUpdate",
    debug = "debug",
    emojiCreate = "emojiCreate",
    emojiDelete = "emojiDelete",
    emojiUpdate = "emojiUpdate",
    error = "error",
    guildBanAdd = "guildBanAdd",
    guildBanRemove = "guildBanRemove",
    guildCreate = "guildCreate",
    guildDelete = "guildDelete",
    guildIntegrationsUpdate = "guildIntegrationsUpdate",
    guildMemberAdd = "guildMemberAdd",
    guildMemberRemove = "guildMemberRemove",
    guildMembersChunk = "guildMembersChunk",
    guildMemberSpeaking = "guildMemberSpeaking",
    guildMemberUpdate = "guildMemberUpdate",
    guildUnavailable = "guildUnavailable",
    guildUpdate = "guildUpdate",
    invalidated = "invalidated",
    inviteCreate = "inviteCreate",
    inviteDelete = "inviteDelete",
    message = "message",
    messageDelete = "messageDelete",
    messageDeleteBulk = "messageDeleteBulk",
    messageReactionAdd = "messageReactionAdd",
    messageReactionRemove = "messageReactionRemove",
    messageReactionRemoveAll = "messageReactionRemoveAll",
    messageReactionRemoveEmoji = "messageReactionRemoveEmoji",
    messageUpdate = "messageUpdate",
    presenceUpdate = "presenceUpdate",
    rateLimit = "rateLimit",
    ready = "ready",
    roleCreate = "roleCreate",
    roleDelete = "roleDelete",
    roleUpdate = "roleUpdate",
    shardDisconnect = "shardDisconnect",
    shardError = "shardError",
    shardReady = "shardReady",
    shardReconnecting = "shardReconnecting",
    shardResume = "shardResume",
    typingStart = "typingStart",
    userUpdate = "userUpdate",
    voiceStateUpdate = "voiceStateUpdate",
    warn = "warn",
    webhookUpdate = "webhookUpdate"
}

const fs = require("fs")

const Events = new Map<EVENT, DiscordEvent>()


fs.readdirSync("./src/events").forEach((f: string) => {
    if (f === "DiscordEvent.ts") return;
    const Event = require(`../events/${f}`)
    const event = new Event();
    Events.set(event.event, event as DiscordEvent)
    Logger.info(`Event '${event.event}' loaded!`)
})


export class EventHandler {
    static handle(Client: Client, Event: EVENT, Payload: any[]): void {
        if (Events.has(Event)) Events.get(Event)!.handle(Client, ...Payload)
    }
}