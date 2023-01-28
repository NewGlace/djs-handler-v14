import { ActionRowBuilder, APIEmbed, APIEmbedField, ApplicationCommandOptionData, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ComponentType, Message, StringSelectMenuBuilder, TextChannel } from "discord.js";
import { HandlerInteraction } from "../../utils/class";
import { HandlerType } from "../../utils/types";
import helpConfig from "../../utils/res/help.json";
import { embedColor } from "../../utils/res/config.json";

export default new HandlerInteraction<HandlerType.Commands>(
	{
		name: 'help',
		description: 'Display the list of different commands',
        options: [
            {
                name: "command", 
                type: ApplicationCommandOptionType.String,
                required: false,
                description: "a command",
                autocomplete: true
            }
        ]
	},
	async (client, interaction) => {
        const command = interaction.options.getString("command", false);
        if (command) {            
            const data = client.commands.get(command);
            if (!data) return interaction.reply({ content: `Error command not found`,ephemeral: true });

            // fields list
            const fields: APIEmbedField[] = [{
                name: `・Mention of the command`,
                value: `</${command}:${(client.inDev ? interaction.guild : client.application)?.commands.cache.find(r => r.name === command)?.id}>`
            }];

            // We see if the command has options, if yes, then we display them with their description 
            if (data.default.data?.options && data.default.data?.options.filter(r => r.type !== ApplicationCommandOptionType.Subcommand && r.type !== ApplicationCommandOptionType.SubcommandGroup).length > 0) {
                fields.push({
                    name: `・The Options`,
                    value: data.default.data?.options?.map(r => `> *${r.name}* 🠚 \`${r.description}\``).join("\n")
                })
            }

            const options: {value: string, label: string, description: string}[] = [];
            for (const [k, v] of client.commands) {
                if (k.includes(command) && k !== command) {
                    const list = k.split("/");
                    let com = data.default.data?.options?.find(r => r.name == list[1]);
                    if (list[2]) 
                        com = (<any>com).options?.find((r: any) => r.name == list[2])

                    options.push({label: list.join(" "), value: k, description: com?.description??"no desc"});
                }
            }

            // Select menu
            const component: ActionRowBuilder<StringSelectMenuBuilder>  = new ActionRowBuilder({
                type: ComponentType.ActionRow,
                components: [
                    new StringSelectMenuBuilder({customId: `helpMenuCommand`, placeholder: "Select an command", options: options})
                ],
            });

            // Embed
            const embed: APIEmbed = {
                description: data.default.data?.description,
                fields: fields,
                color: Number(embedColor),
                title: `The command 🠚  \`${command}\``
            }

            if (options.length == 0) interaction.reply({embeds: [embed]})
            else interaction.reply({embeds: [embed], components: [component]})
        } else {
            const options: {value: string, label: string, emoji?: string}[] = [];
            const categoryList: string[] = [];

            // Loop to recover the different categories 
            for (const [k, v] of client.commands) {
                // So we look for all the commands without a slash (the names of the commands correspond to their path)
                if (!k.includes("/")) {
                    // We check that there is no such category and see if it is blacklisted
                    if (!categoryList.includes(v.category) && !helpConfig.igonre.includes(v.category)) {
                        categoryList.push(v.category);
                        const data: {name: string, emoji: string}|undefined = helpConfig.category[<keyof typeof helpConfig["category"]>v.category];
                        options.push({label: data?.name??"No Category", value: v.category, emoji: data?.emoji??undefined})
                    }
                }
            }

            // The select Menu
            const component: ActionRowBuilder<StringSelectMenuBuilder>  = new ActionRowBuilder({
                type: ComponentType.ActionRow,
                components: [
                    new StringSelectMenuBuilder({customId: `helpMenu`, placeholder: "Select a category to view", options: options})
                ],
            });

            // The embed
            const embed: APIEmbed = {
                description: `❔・**__Who am I?__**\nI am a bot using this [Handler](https://github.com/NewGlace/djs-handler-v14)\n\n**__List of categories__**\n${options.map(r => ` ${r.label}`).join("\n")}`,
                color: Number(embedColor),
                title: "Help Menu"
            }
            
            interaction.reply({embeds: [embed], components: [component]})
        }
	}
);


/*
 *         Credits          
 * Made by : NewGlace 🧊#2408
 * Support Server : https://discord.gg/6pnDcSs
 * If this handler helped you, don't forget the little ⭐
 * 
 */