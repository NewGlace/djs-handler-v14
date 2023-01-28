import { AutocompleteInteraction, ButtonInteraction, CacheType, ChatInputCommandInteraction, ModalSubmitInteraction, PermissionResolvable, SelectMenuInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { BotClient } from "../class";

export interface ClientBotOptions {
    token: string;
	handlers: HandlerType[];
    developers: {owner?: boolean, discordId: string, githubId: string}[],
	inDev: boolean
}

export type DefaultCommandRunFunction = (client: BotClient, interaction: ChatInputCommandInteraction<CacheType>) => any;

export interface Permission {
	bot?: PermissionResolvable;
	user?: {
		perms?: PermissionResolvable;
		dev?: boolean;
		mod?: boolean;
	};
}
export type HandlerInteractionType = {
	"buttons": ButtonInteraction,
	"modals": ModalSubmitInteraction,
	"commandsAutocomplete": AutocompleteInteraction,
	"selectsMenu": SelectMenuInteraction,
	"commands": ChatInputCommandInteraction<CacheType>,
	"subCommands": ChatInputCommandInteraction<CacheType>,
	"events": null,
	"contextMenu": UserContextMenuCommandInteraction,
}

export enum HandlerType {
	"Buttons" = "buttons",
	"Modals" = "modals",
	"CommandsAutocomplete" = "commandsAutocomplete",
	"SelectsMenu" = "selectsMenu",
	"Commands" = "commands",
	"SubCommands" = "subCommands",
	"Events" = "events",
	"ContextMenu" = "contextMenu",
}
