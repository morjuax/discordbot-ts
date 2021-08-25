import {Message, PermissionResolvable} from "discord.js";
import {Commands} from "./enums/commands.enum";
import {config} from "./config";

export const CoreMessage = {
    startsWith: (message: Message, command: Commands): boolean => {
        return message.content.startsWith(`${config.prefix}${command}`)
    },
    sendMessageChannel: async (message: Message, content: string): Promise<any> => {
        return await message.channel.send(content);
    },
    sendMessageReply: async (message: Message, content: string): Promise<any> => {
        return await message.reply(content);
    },
    isChannelValid: (id: string): boolean => {
        return id === process.env.CHANNEL_ID_VALID;
    },
    hasPermission: (message: Message, permissions: PermissionResolvable[]): boolean => {
        return message.member.hasPermission(permissions)
    }

}
