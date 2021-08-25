import { config as configEnv } from 'dotenv';
configEnv();

import {Client, Message} from 'discord.js';
import { config } from './config';
const client: Client = new Client();

client.on('ready', () => {
    console.log('Bot is ready!');
});

const isChannelValid = ({id} : {id: string}) => {
    return id === process.env.CHANNEL_ID_VALID;
}

client.on('message', async (message: Message) => {
    if (message.content.startsWith(`${config.prefix}ping`)) {
        if (isChannelValid(message.channel)) {
            // await message.channel.send('🚀 pong'); // general message
            await message.reply(' pong!'); // specific message - example
        }
    }

    if (message.content.startsWith(`${config.prefix}kick`)) { // kick user
        if (message.member.hasPermission(['KICK_MEMBERS'])) {
            const member = message.mentions.members.first();
            if (member) {
                const kickedMember = await member.kick();
                return await message.channel.send(`${kickedMember.user.username} has been kicked`);
            }
        }
        return message.reply('You need permissions to do this');
    }

    if (message.content.startsWith(`${config.prefix}deleteMessages`)) { // delete last messages
        const messages = await message.channel.fetchMessages();
        await message.channel.bulkDelete(messages);
    }
});

(async () => {
    await client.login(process.env.DISCORD_TOKEN);
})();

