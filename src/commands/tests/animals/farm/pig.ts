import { HandlerInteraction } from "../../../../utils/class";
import { HandlerType } from "../../../../utils/types";

export default new HandlerInteraction<HandlerType.SubCommands>("pig", (client, interaction) => {
    interaction.reply({ content: "groin", ephemeral: true});
});
