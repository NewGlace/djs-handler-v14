import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.SelectsMenu>("selectMenuTemplate", (client, interaction) => {

    Console.info("Select Menu Template", interaction);
    
    interaction.reply({content: `Data sent to the console!`, ephemeral: true});

});