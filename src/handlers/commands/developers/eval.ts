import { ApplicationCommandOptionType, Colors } from "discord.js";
import { HandlerInteraction } from "../../../utils/class";
import { HandlerType } from "../../../utils/typings";
import { inspect } from 'util';

export default new HandlerInteraction<HandlerType.Commands>(
	{
		name: 'eval',
		description: 'Testing code',
        options: [
            {
                name: "code", 
                description: "to change page: --page 1",
                type: ApplicationCommandOptionType.String,
                required: true,
                autocomplete: true
            }
        ]
	},
	async (client, interaction) => {
        try {
            const stringCode = (<any>interaction.options)._hoistedOptions.find((n: any) => n.name == "code").value.replace(/--page \d{1,}/, "");
            const evalCode = await eval(!stringCode.includes("await") ? stringCode : "(async() => {\n"+stringCode+"\n})();");
            const resultCode = inspect(evalCode, { depth: 1 });

            for (let i = 0; i < resultCode.length; i = i + 4000) {
                const splitResultCode = resultCode.slice(i, (i + 4000));
                await interaction[(!interaction.replied ? "reply" : "followUp")]({embeds: [
                    {
                        color: Colors.Green,
                        description: "\`\`\`js\n" + splitResultCode.slice(0, 4000) + "\`\`\`",
                        footer: {
                            text: client.user!!.username + " • Page (" + Math.floor(i / 4000) + "/" + (Math.ceil(resultCode.length / 4000) - 1) + ")"
                        }
                    }
                ], ephemeral: true})
            }
            
        } catch (err) {
            interaction.reply({embeds: [
                {
                    color: Colors.Red,
                    description: "\`\`\`js\n" + (`${err}`).slice(0, 4000) + "\`\`\`",
                    footer: {
                        text: client.user!!.username + " • Page (1/1)"
                    }
                }
            ], ephemeral: true})
        }
	}, {
        permissions: {
            user: {
                dev: true
            }
        }
    }
);