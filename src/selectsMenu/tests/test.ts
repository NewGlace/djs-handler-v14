
import { HandlerInteraction } from "../../utils/class";
import { HandlerType } from "../../utils/types";

export default new HandlerInteraction<HandlerType.SelectsMenu>("test", async (client, interaction) => {   
    interaction.reply({ content: `Wait wait wait`,ephemeral: true });
});