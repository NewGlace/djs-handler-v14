import { AutocompleteInteraction, ButtonInteraction, CacheType, ChatInputCommandInteraction, ModalSubmitInteraction, PermissionResolvable, StringSelectMenuInteraction, UserContextMenuCommandInteraction } from "discord.js";

export interface DataInteraction {
	permissions?: {
		bot?: PermissionResolvable;
		user?: {
			perms?: PermissionResolvable;
			dev?: boolean;
			mod?: boolean;
		};
	},
	cooldown?: {
		value: number;
		allUsers: boolean;
	},
	maintenance?: boolean
}

export type HandlerInteractionType = {
	"buttons": ButtonInteraction,
	"modals": ModalSubmitInteraction,
	"commandsAutocomplete": AutocompleteInteraction,
	"selectsMenu": StringSelectMenuInteraction,
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
