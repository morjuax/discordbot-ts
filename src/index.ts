import {config as configEnv} from 'dotenv';
import {Client, Message} from 'discord.js';
import {CoreMessage} from "./CoreMessage";
import {Commands} from "./enums/commands.enum";

configEnv();

const client: Client = new Client();

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async (message: Message) => {
    const { channel } = message;
    if (!CoreMessage.isChannelValid(channel.id)) {
        return;
    }
    if (CoreMessage.startsWith(message, Commands.ping)) {
        // await CoreMessage.sendMessageReply(message, '🚀 pong!');
        await CoreMessage.sendMessageReply(message, ' pong!');
    }

    if (CoreMessage.startsWith(message, Commands.kick)) { // kick user
        if (CoreMessage.hasPermission(message, ['KICK_MEMBERS'])) {
            const member = message.mentions.members.first();
            if (member) {
                const kickedMember = await member.kick();
                return await CoreMessage.sendMessageChannel(message, `${kickedMember.user.username} has been kicked`);
            }
        }
        return message.reply('You need permissions to do this');
    }

    if (CoreMessage.startsWith(message, Commands.deleteMessages)) { // delete last messages
        const messages = await message.channel.fetchMessages();
        await message.channel.bulkDelete(messages);
    }
});

(async () => {
    await client.login(process.env.DISCORD_TOKEN);
})();

