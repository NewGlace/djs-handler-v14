import { HandlerInteraction } from "../../utils/class";
import { HandlerType} from "../../utils/types";

export default new HandlerInteraction<HandlerType.Buttons>("catNoise", (client, interaction) => {
    interaction.reply({content: `meow`, ephemeral: true});
});