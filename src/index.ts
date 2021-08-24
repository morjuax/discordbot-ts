import { config as configEnv } from 'dotenv';
configEnv();

import {Client, Message} from 'discord.js';
import { config } from './config';
const client: Client = new Client();

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async (message: Message) => {
    if (message.content.startsWith(`${config.prefix}ping`)) {
        await message.channel.send('🚀 pong');
    }
})

client.login(process.env.DISCORD_TOKEN);
