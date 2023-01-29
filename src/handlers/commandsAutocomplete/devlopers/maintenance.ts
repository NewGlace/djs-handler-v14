import { HandlerInteraction } from "../../../utils/class";
import { HandlerType } from "../../../utils/typings";
import { emojis } from '../../../res/config.json';

export default new HandlerInteraction<HandlerType.CommandsAutocomplete>("maintenance",
	async (client, interaction) => {
        const choices: {name: string, value: string}[] = []
        for (const handler of client.handlers) {
            if (handler == HandlerType.SubCommands) continue;
            if (handler == HandlerType.Events) continue;

            for (const [id, value] of client[handler]) {
                const emoji = (handler === HandlerType.Commands ? (<any>value).default : value).maintenance ? emojis.maintenance.true : emojis.maintenance.false;
                choices.push({name: `${emoji} | ${handler} | ${id.split("_")[0].replace(/\//g, " ")}`, value: `${handler}=${id}`})
            }

        }

        const focusedOption = interaction.options.getFocused(true);

        const filtered = choices.filter(choice => (choice.name.toLowerCase()+"").includes(focusedOption.value.toLocaleLowerCase())).slice(0, 24)

        await interaction.respond(filtered)
	}, {
        permissions: {
            user: {
                dev: true
            }
        }
    }
);