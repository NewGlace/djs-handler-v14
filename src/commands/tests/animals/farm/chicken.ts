import { HandlerInteraction } from "../../../../utils/class";
import { HandlerType } from "../../../../utils/types";

export default new HandlerInteraction<HandlerType.SubCommands>("chicken", (client, interaction) => {
    interaction.reply({ content: "cot", ephemeral: true});
});
