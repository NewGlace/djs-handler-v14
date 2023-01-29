import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.Modals>("modalTemplate", (client, interaction) => {

    Console.info("Modal Template", interaction);
    interaction.reply({content: `Data sent to the console!`, ephemeral: true});

});