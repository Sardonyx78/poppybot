import { CommandUsage, Argument, CommandInfo, Command, Perms } from './commands/Command';
import { cyan, red, yellow, green } from 'colors'
import { GuildMember, PermissionResolvable } from 'discord.js';


export class Generator {
    static CommandUsage(args: Argument[], command: string): CommandUsage {
        return {
            args: args.sort((a, b) => a.order - b.order),
            command: command
        } as CommandUsage
    }
}


export function matchArguments(original: Argument[], match: string[]): Argument[]{

    const __org = original.sort((a, b) => a.order - b.order) as Array<Argument>


    for (let i = 0; i < original.length; i++) {
        __org[i] = new Argument(__org[i].optional, match[i], __org[i].name, __org[i].desc, __org[i].order)
    }

    return __org
}

export class Logger {

    static info(info: string) {
        const time = new Date();
        console.log(cyan(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] [INFO] ${info}`))
    }

    static error(error: Error | string) {
        const time = new Date();
        console.log(red(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] [ERROR] ${error.toString()}`))
    }

    static warn(message: string) {
        const time = new Date();
        console.log(yellow(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] [WARN] ${message}`))
    }

    static success(info: string) {
        const time = new Date();
        console.log(green(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] [SUCCESS] ${info}`))
    }
}


export const checkPermission = (command: Command, member: GuildMember): boolean => member.hasPermission(command.permissions as PermissionResolvable)

