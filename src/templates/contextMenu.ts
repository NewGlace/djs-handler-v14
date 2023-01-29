import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.Buttons>("contextMenuTemplate", (client, interaction) => {

    Console.info("Context Menu Template", interaction);
    interaction.reply({content: `Data sent to the console!`, ephemeral: true});

});