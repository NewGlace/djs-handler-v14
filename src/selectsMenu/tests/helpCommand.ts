import { APIEmbed, APIEmbedField, ApplicationCommandOptionType } from "discord.js";
import { HandlerInteraction } from "../../utils/class";
import { HandlerType } from "../../utils/types";

export default new HandlerInteraction<HandlerType.SelectsMenu>("helpMenuCommand", async (client, interaction) => {
    const commandName = interaction.values[0];
    const data = client.commands.get(commandName)!!;

    const fields: APIEmbedField[] = [{
        name: `・Mention of the command`,
        value: `</${commandName.split("/").join(" ")}:${(client.inDev ? interaction.guild : client.application)?.commands.cache.find(r => r.name === commandName.split("/")[0])!!.id}>`
    }];
    const int = commandName.split("/");
    
    
    const data2 = data.default.data ?? (int.length == 2 ? client.commands.get(int[0])?.default.data?.options?.find(r => r.name == int[1]) : (<any>client.commands.get(int[0])?.default.data?.options?.find(r => r.name == int[1]))?.options?.find((r: any) => r.name == int[2]))
    if (data2?.options && data2.options.filter((r: any) => r.type !== ApplicationCommandOptionType.Subcommand && r.type !== ApplicationCommandOptionType.SubcommandGroup).length > 0) {
        fields.push({
            name: `・The options`,
            value: data2.options?.map((r: any) => `> *${r.name}* 🠚 \`${r.description}\``).join("\n")
        })
    }

    const embed: APIEmbed = {
        description: data2.description,
        fields: fields,
        color: 0xDCFCFF,
        title: `The command 🠚 \`${commandName.split("/").join(" ")}\``
    }

    interaction.reply({embeds: [embed], ephemeral: true})
});
