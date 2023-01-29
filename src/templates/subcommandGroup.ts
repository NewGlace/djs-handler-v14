import { ApplicationCommandOptionType } from "discord.js";
import { HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.Commands>({
    name: "subcommandsGroupTemplate",
    description: "a subcommandGroup template",
    options: [
        {
            name: "subcommand",
            description: "a subcommand template",
            type: ApplicationCommandOptionType.Subcommand
        }
    ]
});