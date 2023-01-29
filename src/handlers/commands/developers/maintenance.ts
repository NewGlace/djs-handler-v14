import { ApplicationCommandOptionType } from "discord.js";
import { HandlerInteraction } from "../../../utils/class";
import { error } from "../../../utils/func";
import { HandlerType } from "../../../utils/typings";
import { emojis } from '../../../res/config.json';

export default new HandlerInteraction<HandlerType.Commands>(
	{
		name: 'maintenance',
		description: 'set/remove maintenance from an interaction',
        options: [
            {
                name: "interraction", 
                type: ApplicationCommandOptionType.String,
                description: "The interactions",
                required: true,
                autocomplete: true
            }
        ]
	},
	async (client, interaction) => {
        const interactionId = interaction.options.getString("interraction", true);

        const [handler, id] = interactionId.split("=");
        const i = handler == HandlerType.Commands ? 
            client[<HandlerType.Commands>handler].get(id)?.default:
            client[<HandlerType.Buttons>handler].get(id);

        if (!i) return error(interaction, {content: "interaction not found", ephemeral: true});
        i.maintenance = !i.maintenance;
        if (i.maintenance) interaction.reply({ephemeral: true, content: `${emojis.maintenance.true} the interaction is in maintenance.`});
        else interaction.reply({ephemeral: false, content: `${emojis.maintenance.false} the interaction is no longer in maintenance.`})
	}, {
        permissions: {
            user: {
                dev: true
            }
        }
    }
);