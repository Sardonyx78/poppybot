import { EVENT } from "../handler/EventHandler"
import { Client } from 'discord.js';

export interface DiscordEvent {
    event: EVENT
    handle: (Client: Client, ...args: any) => any
}