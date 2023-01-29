import { HandlerInteraction } from "../../../utils/class";
import { HandlerType } from "../../../utils/typings";

export default new HandlerInteraction<HandlerType.Modals>("test", async (client, interaction) => {
    const text = interaction.fields.getTextInputValue("testText");
    interaction.reply({content: text});
});