import { GatewayIntentBits } from 'discord.js';
import { BotClient } from './utils/class';
import { HandlerType } from "./utils/types";
import config from './utils/res/config.json';

export const clientExported = new BotClient({
		developers: [
			{ owner: true, githubId: "NewGlace", discordId: "528340380064677891" }
		],
		handlers: [
 			HandlerType.Buttons,
        	HandlerType.Commands,
        	HandlerType.Events,
        	HandlerType.Modals,
        	HandlerType.SelectsMenu,
			HandlerType.ContextMenu,
			HandlerType.CommandsAutocomplete,
		],
		token: (config.inDev ? config.dev : config.master).token,
		inDev: config.inDev
	}, {
		intents: [
			GatewayIntentBits.Guilds
		],
	}
);

/*
 *         Credits          
 * Made by : NewGlace 🧊#2408
 * Support Server : https://discord.gg/6pnDcSs
 * If this handler helped you, don't forget the little ⭐
 * 
 * Nota bene: the files with the credits are BotClient.ts, Console.ts, Handler.ts, interaction.ts, help.ts
 */