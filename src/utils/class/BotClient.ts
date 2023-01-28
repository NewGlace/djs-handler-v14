import { Client, ClientOptions, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Console, HandlerInteraction} from '.';
import { HandlerType, ClientBotOptions } from '../types';

export class BotClient extends Client {
	// The different client options
	inDev: boolean; // If it's a development version
	developers: {owner?: boolean, discordId: string, githubId: string}[]; // Developers list
	launchedAt: number; // the time to launch the program
	handlers: HandlerType[]; // List of activated handlers
	#token: string; // the private token
	
	constructor(options: ClientBotOptions, clientOptions: ClientOptions) {
		super(clientOptions);
		this.inDev = options.inDev;
		this.#token = options.token;
		this.developers = options.developers;
		this.handlers = options.handlers;
		this.launchedAt = Date.now();
		this.launch();
	}

	// The collections of each handler except events
    buttons = new Collection<string, HandlerInteraction<HandlerType.Buttons>>();
    modals = new Collection<string, HandlerInteraction<HandlerType.Modals>>();
    commands = new Collection<string, {default: HandlerInteraction<HandlerType.Commands> | HandlerInteraction<HandlerType.SubCommands>, category: string}>();
    selectsMenu = new Collection<string, HandlerInteraction<HandlerType.SelectsMenu>>();
    contextMenu = new Collection<string, HandlerInteraction<HandlerType.ContextMenu>>();
	commandsAutocomplete = new Collection<string, HandlerInteraction<HandlerType.CommandsAutocomplete>>();
	
	async launchHandler() {
		const addHandler = (handler: HandlerType, ...files: string[]) => {
			// recover the path
			const path = `../../${handler}/${files.join("/")}`;
			// Delete the cache
			delete require.cache[require.resolve(path)];
			
			// Handler is Events
			if (handler === HandlerType.Events) {
				const handlerClass: HandlerInteraction<"ready"> = require(path).default;
				this.on(handlerClass?.name, handlerClass.run.bind(null, this));
				
			// Handler is Commands/SubCommands, separated from other interactions to have a category 
			} else if (handler !== HandlerType.Commands && handler !== HandlerType.SubCommands) {
				const handlerClass: HandlerInteraction<typeof handler> = require(path).default;
				this[handler as HandlerType.Modals].set(`${handlerClass?.name}`, handlerClass as any);

			// The remaining Handlers
			} else { 
				const handlerClass: HandlerInteraction<typeof handler> = require(path).default;
				this[handler as HandlerType.Commands].set(`${files.slice(1).join("/").replace(".js", "")}`, {default:  handlerClass as any, category: files[0]});
				
			}
		}
		
		// functions to search for files in an infinite number of folders
		const getFolder = (handler: HandlerType, ...files: string[]) => {
			const folders = readdirSync(`./out/${[handler, ...files].join("/")}`);
			for (const folder of folders) {
				if (!folder.endsWith('.js')) {
					getFolder(handler, ...files, folder)
				} else addHandler(handler, ...files, folder);
			}
		}
		
		// A loop that fetches all files in all folders of the handler
		for (const handler of this.handlers) {
			if (handler == HandlerType.SubCommands) continue;
			
			const time = Date.now();
			getFolder(handler);

			Console.info("Hundler", `${handler} Folder initiated in ${Date.now() - time}ms.`)
		}
	}


	async launch() {
		await this.launchHandler();
		this.login(this.#token);
	}
}



/*
 *         Credits          
 * Made by : NewGlace 🧊#2408
 * Support Server : https://discord.gg/6pnDcSs
 * If this handler helped you, don't forget the little ⭐
 * 
 */