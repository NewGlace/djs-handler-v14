import { Guild } from 'discord.js';
import { HandlerInteraction, Console } from '../utils/class';

export default new HandlerInteraction('ready', async (client) => {
	Console.log(`${client.user?.username} launched in ${Date.now() - client.launchedAt}ms !`);
	Console.info('Commands', 'SETUP');

	// Let's get the list of commands and contextMenu
	const allCommands = [client.contextMenu.map(c => c.data!!), client.commands.filter(c => c.default.data as any).map(c => (c.default as any).data!!)].flat();

	// If the bot is in development version, we will add the commands only on the private servers
	if (client.inDev) {
		// Private servers list
		const guilds = [
			client.guilds.cache.get(`820619530744365056`)
		];

		for (const guild of guilds as Guild[]) {
			if (!guild) continue;
			// Loop to delete old commands
			for (const c of guild?.commands.cache.map(e => e) ?? []) {
				await guild?.commands.delete(c);
			}
			
			// Adding commands (private servers)
			await guild.commands.set(allCommands);
		}
	// Adding commands (all servers)
	} else client.application?.commands.set(allCommands);
});
