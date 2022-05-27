/*
name: justinbot,
version: 1.0.0,
description: Bot used to tell when certain users are online
*/
const { Client, Intents, User } = require('discord.js');
const { token, userID, channelID, serverID } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });

const interval = 1000;
let stat = [];
let user, channel;

async function getNewStat() {
    if(stat.length === 2){
        stat.shift();
    }
    user = await client.guilds.fetch(serverID); //gets the server
    user = user.members.cache.get(userID); //gets the user
    channel = client.channels.cache.get(channelID);
    if(!user.presence?.status){
        stat.push("offline");
    }
    else{
        stat.push(user.presence.status);
    }
    if(stat[0] === "offline" && stat[1] === "online"){
        console.log(`${user.displayName} was ${stat[0]} and is now ${stat[1]}`);
        channel.send('https://tenor.com/view/justin-online-gif-22767961 @everyone');
    }
    else if(stat[0] === "online" && stat[1] === "offline"){
        console.log(`${user.displayName} was ${stat[0]} and is now ${stat[1]}`);
        channel.send('https://tenor.com/view/offline-justin-gif-22767954 @everyone');
    }
}

client.once('ready', () => {
    console.log("Bot now online...");
    setInterval(getNewStat, interval);
})

//place at end of file
client.login(token);
