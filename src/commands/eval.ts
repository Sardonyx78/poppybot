import { Command, CommandInfo, CommandUsage, Perms } from "./Command";
import { MessageEmbed, PermissionFlags, PermissionString } from 'discord.js';

module.exports =
    class EVAL_COMMAND implements Command {
        name: string;
        aliases: string[];
        permissions: Perms[];
        info: CommandInfo;
        dm: boolean;

        constructor() {
            this.info = {
                displayname: "Eval",
                description: "Executes the code given.",
                usage: {
                    command: "eval",
                    args: [],
                    override: true
                } as CommandUsage
            }
            this.name = "eval"
            this.aliases = []
            this.dm = true
            this.permissions = [Perms.BOT_OWNER]
        }

        async handle(client: import("discord.js").Client, guildCache: any, message: import("discord.js").Message, args: import("./Command").Argument[] | string[]) {

            (args)

            const _eval = args.join(" ").split("\n")
            _eval.shift()
            _eval.pop()

            let output = {
                context: null,
                isJSON: false
            } as any

            try {
                output.context = await eval(_eval.join("\n"))

                if (output.context === undefined) output.context = "undefined"
                
                if (output.context.toString() === "[object Object]") {
                    output.context = JSON.stringify(output.context, null, 2)
                    output.isJSON = true   
                }


                message.channel.send(new MessageEmbed().setColor(0x3278bc).addField('Input', "```js\n" + _eval.join("\n") + "\n```").addField('Output', `\`\`\`${(output.isJSON) ? "json\n" : "ts\n"}${output.context}\n\`\`\``))

                
            } catch (err) {
                message.channel.send(new MessageEmbed().addField('Error', "```\n" + err + "\n```").setColor(0xe74c3c))
            }
            
        }
    }