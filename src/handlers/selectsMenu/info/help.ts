import { APIEmbed } from "discord.js";
import { HandlerInteraction } from "../../../utils/class";
import { HandlerType } from "../../../utils/typings";
import { category } from "../../../res/help.json"
import { embedColor } from "../../../res/config.json"

export default new HandlerInteraction<HandlerType.SelectsMenu>("helpMenu", async (client, interaction) => {
    const commandList: string[] = [];
    const catName = interaction.values[0];

    for (const [k, v] of client.commands) {
        if (!k.includes("/")) {
            if (v.category == catName) {
                commandList.push(k);
            }
        }
    }
    const embed: APIEmbed = {
        description: `❔・**__How to see the information of a command__**\n\`/help <Name of the commands>\` (</help:${(client.inDev ? interaction.guild : client.application)?.commands.cache.find(r => r.name === "help")!!.id}>).`,
        fields: [
            {
                value: commandList.map(r => `</${r}:${(client.inDev ? interaction.guild : client.application)?.commands.cache.find(a => a.name === r)!!.id}>`).join("・"), 
                name: `__**Total commands**__ [\`${commandList.length}\`]`
            }
        ],
        color: Number(embedColor),
        title: `Category 🠚 ${category[<keyof typeof category>catName]?.name??"No Category"}`
    }
    interaction.reply({embeds: [embed], ephemeral: true})

});