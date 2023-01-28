import { ChatInputCommandInteraction, InteractionType } from 'discord.js';
import { HandlerInteraction, Console} from '../utils/class';
import { HandlerType } from '../utils/types';


//Small function to get the id of a command.
const generateCommandId = (interaction: ChatInputCommandInteraction) => {
	//- it is composed of its name
	const result = [interaction.commandName];
	
	//- its subCommandGroup if it has one
	const subCommandGroup = interaction.options.getSubcommandGroup(false);
	if (subCommandGroup) result.push(subCommandGroup);
	
	//- its subCommands if it has one
	const subCommand = interaction.options.getSubcommand(false);
	if (subCommand) result.push(subCommand);
	
	//- separated by / (e.g. animals/farm/pig; animals/cat)
	return result.join('/');
}

export default new HandlerInteraction<"interactionCreate">('interactionCreate', async (client, interaction) => {
	
	if (interaction.guild) {	

		// Recovery of the identifier and the type of interaction received
		let data: { type?: HandlerType, id: string } = { type: undefined, id: "" };

		if (interaction.isButton()) data = { type: HandlerType.Buttons, id: interaction.customId.split("_")[0] };
		else if (interaction.isModalSubmit()) data = { type: HandlerType.Modals, id: interaction.customId.split("_")[0] };
		else if (interaction.isStringSelectMenu()) data = { type: HandlerType.SelectsMenu, id: interaction.customId.split("_")[0] };
		else if (interaction.isUserContextMenuCommand()) data = { type: HandlerType.ContextMenu, id: interaction.commandName };
		else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) data = { type: HandlerType.CommandsAutocomplete, id: interaction.commandName };
		else if (interaction.isChatInputCommand()) data = { type: HandlerType.Commands, id: generateCommandId(interaction) };

		// If the interaction
		// Then we'll see if it exists and see if the bot and the user have the permission to use it  
		const command = data.type == HandlerType.Commands ? client.commands.get(data.id)?.default : client[<"modals">data.type].get(data.id);
		if (!command) return;

		if (command.permissions) {
			const member = interaction.guild.members.cache.get(interaction.user.id);
			let error: string|undefined

			// Bot permissions
			if (!interaction.guild.members.cache.get(client.user!!.id)?.permissions.has(command.permissions.bot ?? []))
				error = "I can't handle this command, I need permission that are missing : `" + command.permissions.bot?.toString() + '`.';

			// User permissions
			if (!member?.permissions.has(command.permissions.user?.perms ?? []))
				error = `You can't use that command, you need permissions that are missing : \`${command.permissions.user?.perms?.toString()}\`.`;

			// User permissions developers
			if (command.permissions.user?.dev && !client.developers.find(r => r.discordId == member?.id))
				error = `You can't use that command, you need to be a bot developer.`;

			if (error) return (<any>interaction)?.reply({ content: error, ephemeral: true });
		}

		try {
			await command.run(client, <any>interaction);
		} catch (error) {
			// If an error is found during the execution of the file 
			Console.error(`An error occured while trying to exectue the ${data.type} ${data.id} : ${(<TypeError>error).message}${(<TypeError>error).stack ? `\n\`\`\`\n${(<TypeError>error).stack}\`\`\`` : ""}`);
		}

	}
});

/*
 *         Credits          
 * Made by : NewGlace 🧊#2408
 * Support Server : https://discord.gg/6pnDcSs
 * If this handler helped you, don't forget the little ⭐
 * 
 */