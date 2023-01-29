import { Console, HandlerInteraction } from "../utils/class";
import { HandlerType } from "../utils/typings";

export default new HandlerInteraction<HandlerType.Buttons>("buttonTemplate", (client, interaction) => {

    Console.info("Button Template", interaction);
    interaction.reply({content: `Data sent to the console!`, ephemeral: true});

});