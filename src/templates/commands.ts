import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.Commands>({
    name: "commandsTemplate",
    description: "a command template"
}, (client, interaction) => {

    Console.info("commands Template", interaction);
    
    interaction.reply({content: `Data sent to the console!`, ephemeral: true});

});