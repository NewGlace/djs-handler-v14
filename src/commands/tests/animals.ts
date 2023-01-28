import { ApplicationCommandOptionType } from 'discord.js';
import { HandlerInteraction } from "../../utils/class";
import { HandlerType } from "../../utils/types";

export default new HandlerInteraction<HandlerType.Commands>({
	name: 'animals',
	description: 'song',
	defaultMemberPermissions: ["Administrator"],
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: 'cat',
			description: 'meow',
		},
		{
			type:  ApplicationCommandOptionType.SubcommandGroup,
			name: 'farm',
			description: 'farm animals',
			options: [
				{
					type:  ApplicationCommandOptionType.Subcommand,
					name: 'pig',
					description: 'groin-groin',
				},
				{
					type:  ApplicationCommandOptionType.Subcommand,
					name: 'chicken',
					description: 'cot'
				}
			],
		},
	],
});