import { HandlerType } from "./";

export interface ClientBotOptions {
    token: string;
	handlers: HandlerType[];
    developers: {owner?: boolean, discordId: string, githubId: string}[],
	inDev: boolean
}