import { HandlerType, HandlerInteractionType, DataInteraction} from '../typings';
import { ClientEvents, ChatInputApplicationCommandData, UserApplicationCommandData } from "discord.js"
import { BotClient } from './';

type InteractionRunFunction<Type extends HandlerType | keyof ClientEvents> = (
	Type extends HandlerType ? (client: BotClient, interaction: HandlerInteractionType[Type]) => any : 
	(Type extends keyof ClientEvents ? (client: BotClient, ...options: ClientEvents[Type]) => any : 
	() => any)
)

export class HandlerInteraction<Type extends HandlerType | keyof ClientEvents> {
	name: string;

	permissions?: DataInteraction["permissions"];
	cooldown?: DataInteraction["cooldown"];
	maintenance?: boolean;

	run?: InteractionRunFunction<Type>;
	data?: Type extends HandlerType.Commands ? ChatInputApplicationCommandData : 
		   Type extends HandlerType.ContextMenu ? UserApplicationCommandData : 
	       undefined;

	/**
	 * @param value The value has **4 types** depending on the interaction 
	 * - `Events` - A string with the name of an event as value
	 * - `HandlerType.Commands` - An object with the value *ChatInputApplicationCommandData*
	 * - `HandlerType.ContextMenu ` - An object with the value *UserApplicationCommandData*
	 * - `HandlerType` - A string with value the name of the interaction
	 * 
	 * @param run The function of interaction 
	 * @param data -
	 * - `permissions` User/bot permissions for interraction
	 * - `cooldown` Time between 2 interactions
	 * - `maintenance` interaction maintenance?
	 */
	constructor(
			value: Type extends keyof ClientEvents ? Type : 
			Type extends HandlerType.Commands ? ChatInputApplicationCommandData : 
			Type extends HandlerType.ContextMenu ? UserApplicationCommandData : 
			string,
			run?: InteractionRunFunction<Type>, 
			data?: DataInteraction
		) {
			
		if (typeof(value) == "string") 
			this.name = value;
		else {
			this.name = value.name;
			this.data = <any>value;
		}

		this.run = run;
		this.permissions = data?.permissions;
		this.maintenance = data?.maintenance;
		this.cooldown = data?.cooldown;
	}
}