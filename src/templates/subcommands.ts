import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.SubCommands>("subcommand", (client, interaction) => {

    Console.info("subcommand Template", interaction);
    
    interaction.reply({content: `Data sent to the console!`, ephemeral: true});

});