import { ApplicationCommandType } from 'discord.js';
import { HandlerInteraction } from '../../utils/class';
import { HandlerType } from '../../utils/types';

export default new HandlerInteraction<HandlerType.ContextMenu>(
	{
		name: 'your-song',
		type: ApplicationCommandType.User
	},
	async (client, interaction) => {
        interaction.reply({content: "blah blah blah?"}) 
    }
);
