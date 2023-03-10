import { HandlerInteraction } from "../utils/class";

export default new HandlerInteraction<"guildCreate">("guildCreate", (client, guild) => {

});

/** 
 * List of events
 * "applicationCommandPermissionsUpdate"  "autoModerationActionExecution"
 * "autoModerationRuleCreate" "autoModerationRuleDelete"
 * "autoModerationRuleUpdate" "cacheSweep" "channelCreate" "channelDelete"
 * "channelPinsUpdate" "channelUpdate" "debug" "warn" "emojiCreate"
 * "emojiDelete" "emojiUpdate" "error" "guildBanAdd" "guildBanRemove"
 * "guildCreate" "guildDelete" "guildUnavailable" "guildIntegrationsUpdate" 
 * "guildMemberAdd" "guildMemberAvailable" "guildMemberRemove" "guildMembersChunk"
 * "guildMemberUpdate" "guildUpdate" "inviteCreate" "inviteDelete" "messageCreate"
 * "messageDelete" "messageReactionRemoveAll" "messageReactionRemoveEmoji"
 * "messageDeleteBulk" "messageReactionAdd" "messageReactionRemove" "messageUpdate"
 * "presenceUpdate" "ready" "invalidated" "roleCreate" "roleDelete" "roleUpdate"
 * "threadCreate" "threadDelete" "threadListSync" "threadMemberUpdate" "threadMembersUpdate"
 * "threadUpdate" "typingStart" "userUpdate" "voiceStateUpdate" "webhookUpdate" "interactionCreate"
 * "shardDisconnect" "shardError" "shardReady" "shardReconnecting" "shardResume" "stageInstanceCreate"
 * "stageInstanceUpdate" "stageInstanceDelete" "stickerCreate" "stickerDelete" "stickerUpdate"
 * "guildScheduledEventCreate" "guildScheduledEventUpdate" "guildScheduledEventDelete"
 * "guildScheduledEventUserAdd" "guildScheduledEventUserRemove"
 */