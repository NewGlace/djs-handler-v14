import { HandlerType, HandlerInteractionType, Permission} from '../types';
import { ClientEvents, ChatInputApplicationCommandData, UserApplicationCommandData } from "discord.js"
import { BotClient } from './';

export class HandlerInteraction<Type extends HandlerType | keyof ClientEvents> {
	// We get the name of the event or interaction 
	name!: Type extends keyof ClientEvents ? Type : string;

	/**
	* 3 arrow functions: 
	* - the first one for interactions.
	* - the second one for events. 
	* - the third one for if you forgot something.
	*/
	run!: ( Type extends HandlerType ? (client: BotClient, interaction: HandlerInteractionType[Type]) => any : 
		  ( Type extends keyof ClientEvents ? (client: BotClient, ...options: ClientEvents[Type]) => any : 
		  () => any));

	// The permissions 
	permissions?: Permission;

	// More data for commands, context menu
	data!: Type extends HandlerType.Commands ? ChatInputApplicationCommandData : undefined;

	constructor(
			/**
			 * The value has 4 options:
			 * - event name
			 * - commands data
			 * - context menu data
			 * - interaction name
			 */
			value: Type extends keyof ClientEvents ? Type : 
			Type extends HandlerType.Commands ? ChatInputApplicationCommandData : 
			Type extends HandlerType.ContextMenu ? UserApplicationCommandData : 
			string, 

			/**
			 * 3 arrow functions: 
			 * - the first one for interactions.
			 * - the second one for events. 
			 * - the third one for if you forgot something.
			 */
			run?: ( Type extends HandlerType ? (client: BotClient, interaction: HandlerInteractionType[Type]) => any : 
				  ( Type extends keyof ClientEvents ? (client: BotClient, ...options: ClientEvents[Type]) => any : 
				  () => any)), 

			// The permissions 
			permissions?: Permission
		) {
			
		if (typeof(value) == "string") {
			(<string>this.name) = value;
			(<undefined>this.data) = undefined;
		} else {
			(<string>this.name) = value.name;
			(<ChatInputApplicationCommandData | UserApplicationCommandData>this.data) = value;
		}

		(<any>this.run) = run;
		this.permissions = permissions;
	}
}

/*
 *         Credits          
 * Made by : NewGlace 🧊#2408
 * Support Server : https://discord.gg/6pnDcSs
 * If this handler helped you, don't forget the little ⭐
 * 
 */