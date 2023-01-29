import { Client, ClientOptions, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Console, HandlerInteraction} from '.';
import { HandlerType, ClientBotOptions } from '../typings';

export class BotClient extends Client {
	// The different client options
	
	/** If it's a development version */
	inDev: boolean;
	/** Developers list */
	developers: {owner?: boolean, discordId: string, githubId: string}[]; 
	/** the time to launch the program */ 
	launchedAt: number;
	/** List of activated handlers */
	handlers: HandlerType[];

	/** @private */
	#token: string;
	
	/**
	 * Client class constructor
	 * @param options Handler options
	 * @param clientOptions Options for the `Discord.js` module
	 */
	constructor(options: ClientBotOptions, clientOptions: ClientOptions) {
		super(clientOptions);
		this.inDev = options.inDev;
		this.#token = options.token;
		this.developers = options.developers;
		this.handlers = options.handlers;
		this.launchedAt = Date.now();
		this.#launch();
	}

	/** cooldowns map regrouping */
    cooldown = new Collection<string, Collection<string, number>|number>();

	// The collections of each handler except events
    buttons = new Collection<string, HandlerInteraction<HandlerType.Buttons>>();
    modals = new Collection<string, HandlerInteraction<HandlerType.Modals>>();
    commands = new Collection<string, {default: HandlerInteraction<HandlerType.Commands> | HandlerInteraction<HandlerType.SubCommands>, category: string}>();
    selectsMenu = new Collection<string, HandlerInteraction<HandlerType.SelectsMenu>>();
    contextMenu = new Collection<string, HandlerInteraction<HandlerType.ContextMenu>>();
	commandsAutocomplete = new Collection<string, HandlerInteraction<HandlerType.CommandsAutocomplete>>();
	
	/**
	 * @private
	 * Handler launch
	 */
	async #handlerLaunch() {
		/**
		 * 
		 * @param handler Handler type
		 * @param folders The different folders we have been through
		 */
		const addHandler = (handler: HandlerType, ...folders: string[]) => {
			const path = `../../handlers/${handler}/${folders.join("/")}`;
			delete require.cache[require.resolve(path)];
			
			// Handler is Events
			if (handler === HandlerType.Events) {
				const handlerClass: HandlerInteraction<"ready"> = require(path).default;
				this.on(handlerClass?.name, handlerClass.run!!.bind(null, this));
				
			// Handler is Commands/SubCommands, separated from other interactions to have a category 
			} else if (handler !== HandlerType.Commands && handler !== HandlerType.SubCommands) {
				const handlerClass: HandlerInteraction<typeof handler> = require(path).default;
				this[handler as HandlerType.Modals].set(`${handlerClass?.name}`, handlerClass as any);

			// The remaining Handlers
			} else { 
				const handlerClass: HandlerInteraction<typeof handler> = require(path).default;
				this[handler as HandlerType.Commands].set(`${folders.slice(1).join("/").replace(".js", "")}`, {default:  handlerClass as any, category: folders[0]});
				
			}
		}
		
		/**
		 * functions to search for files in an infinite number of folders
		 * @param handler Handler type
		 * @param folders The different folders we have been through
		 */
		const getFolder = (handler: HandlerType, ...folders: string[]) => {
			const newFolders = readdirSync(`./out/handlers/${[handler, ...folders].join("/")}`);

			for (const folder of newFolders) {
				if (!folder.endsWith('.js')) 
					getFolder(handler, ...folders, folder)
				else if (folder) 
					addHandler(handler, ...folders, folder);
			}
		}

		// folders list in the handler folder 
		const handlerList = readdirSync(`./out/handlers`);

		// A loop that fetches all files in all folders of the handler
		for (const handler of this.handlers) {
			if (handler == HandlerType.SubCommands) continue;
			if (!handlerList.includes(handler)) continue;

			const time = Date.now();
			getFolder(handler);
			Console.info("Hundler", `${handler} Folder initiated in ${Date.now() - time}ms.`)
		}
	}

	/** @private - Launch bot */
	async #launch() {
		await this.#handlerLaunch();
		this.login(this.#token);
	}
}
