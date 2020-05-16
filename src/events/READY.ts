import { DiscordEvent } from './DiscordEvent';
import { Client } from 'discord.js';
import { EVENT } from '../handler/EventHandler';
import { Logger } from '../Utils';

module.exports =  class READY_EVENT implements DiscordEvent {
    event: EVENT
    constructor() {
        this.event = EVENT.ready
    }

    async handle(client: Client) {
        Logger.success(`Ready!`)
    }
}