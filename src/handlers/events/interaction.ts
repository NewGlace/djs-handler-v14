import { ChatInputCommandInteraction, Collection, InteractionType } from 'discord.js';
import { HandlerInteraction, Console} from '../../utils/class';
import { error } from '../../utils/func';
import { HandlerType } from '../../utils/typings';


//Small function to get the id of a command.
const __generateCommandId = (interaction: ChatInputCommandInteraction) => {
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
		else if (interaction.isChatInputCommand()) data = { type: HandlerType.Commands, id: __generateCommandId(interaction) };

		// If the interaction
		// Then we'll see if it exists and see if the bot and the user have the permission to use it  
		const handler = data.type == HandlerType.Commands ? client.commands.get(data.id)?.default : client[<"modals">data.type].get(data.id);
		if (!handler) return;

		const member = interaction.guild.members.cache.get(interaction.user.id);
		if (handler.permissions) {
			let errorText: string|undefined

			// Bot permissions
			if (!interaction.guild.members.cache.get(client.user!!.id)?.permissions.has(handler.permissions.bot ?? []))
			errorText = "I can't handle this command, I need permission that are missing : `" + handler.permissions.bot?.toString() + '`.';

			// User permissions
			if (!member?.permissions.has(handler.permissions.user?.perms ?? []))
			errorText = `You can't use that command, you need permissions that are missing : \`${handler.permissions.user?.perms?.toString()}\`.`;

			// User permissions developers
			if (handler.permissions.user?.dev && !client.developers.find(r => r.discordId == member?.id))
			errorText = `You can't use that command, you need to be a bot developer.`;

			if (errorText) 
				return error(interaction, { content: errorText, ephemeral: true });
		}
		if (handler.maintenance)// && !client.developers.find(r => r.discordId == member?.id)) 
			return error(interaction, { content: "The interaction is in maintenance", ephemeral: true });

		if (handler.cooldown) {
			if (handler.cooldown.allUsers) {
				const cooldown = <number>client.cooldown.get(handler.name)??0
				if (cooldown <= Date.now()) client.cooldown.set(handler.name, Date.now()+handler.cooldown.value);
				else return error(interaction, { content: `You must wait before making this interaction. (<t:${(cooldown/1000)|0}:R>)`, ephemeral: true });
			} else {
				if (!client.cooldown.has(handler.name)) client.cooldown.set(handler.name, new Collection<string, number>());
				const cooldown = <Collection<string, number>>client.cooldown.get(handler.name);
				const userCooldown = cooldown.get(interaction.user.id)??0;
				if (userCooldown <= Date.now()) cooldown.set(interaction.user.id, Date.now()+handler.cooldown.value);
				else return error(interaction, { content: `You must wait before making this interaction. (<t:${(userCooldown/1000)|0}:R>)`, ephemeral: true });
			}
		}

		try {
			if (handler.run) await handler.run(client, <any>interaction);
		} catch (error) {
			// If an error is found during the execution of the file 
			Console.error(`An error occured while trying to exectue the ${data.type} ${data.id} : ${(<TypeError>error).message}${(<TypeError>error).stack ? `\n\`\`\`\n${(<TypeError>error).stack}\`\`\`` : ""}`);
		}

	}
});