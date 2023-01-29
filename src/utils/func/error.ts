import { Interaction } from "discord.js";

/**
 * 
 * @param interaction interaction in progress
 * @param data Additional data, for error message
 * - `content` error message
 * - `ephemeral` ephemeral message
 * @example
 * error(interaction, {content: "Um, this is a error"})
 */
export function error(interaction: Interaction, data: {content: string, ephemeral?: boolean}) {
    if (interaction.isRepliable()) interaction.reply(data);
}