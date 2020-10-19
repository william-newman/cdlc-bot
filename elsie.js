import Discord from "discord.js";
import { elsieToken } from "./elsie-token.js";
import fs from "fs";

const client = new Discord.Client();
const channels = client.channels;

client.on("ready", () => {
  let time = new Date();
  fs.appendFile(
    "./elsie-logs.txt",
    client.user.tag + " has connected at " + time + "\n",
    function (err) {
      if (err) throw err;
    }
  );

  // const serverList = client.guilds.cache;

  // serverList.forEach((guild) => {
  //   console.log(guild.name);

  //   guild.channels.cache.forEach((channel) => {
  //     logChannelAndEmojiIDs(
  //       `${channel.type} -  ${channel.name} ${channel.id}\n`
  //     );
  //   });
  // });

  console.log("Running ...");
});

// Function to be triggered on any message to any server the bot is in
client.on("message", (receivedMessage) => {
  const incomingM = receivedMessage.content.toLowerCase();

  if (receivedMessage.author == client.user) {
    return;
  }

  // receivedMessage.guild.emojis.cache.forEach((customEmoji) => {
  //   logChannelAndEmojiIDs(`${customEmoji.name} ${customEmoji.id}\n`);
  // });

  if (incomingM.startsWith("!cdlc")) {
    const command = incomingM.substring(6);
    if (command.startsWith("help")) {
        receivedMessage.channel.send("No help data currently.")
    }
  }

  if (incomingM.startsWith("say hi")) {
    receivedMessage.channel.send(
      "Yo yo what up " + receivedMessage.author.toString() + "!",
      { tts: true }
    );
  }
});

// Will not work currently
function localDataWriteService(dataToWrite) {
  let rawElsieData = fs.readFileSync("./elsie-command-data.json");
  let elsieData = JSON.parse(rawElsieData);
  //   elsieData.dataToWrite;
  const stringElsieData = JSON.stringify(elsieData, null, 2);
  fs.writeFileSync("./elsie-command-data.json", stringElsieData);
}

// No data to read currently
function localDataReadService() {
  let rawElsieData = fs.readFileSync("./elsie-command-data.json");
  let elsieData = JSON.parse(rawElsieData);
  return elsieData;
}

// Run once.
function logChannelAndEmojiIDs(identificationData) {
  console.log(identificationData);
  fs.appendFileSync("./elsie-ids.txt", identificationData);
}

client.on("disconnect", () => {
  fs.appendFileSync("./elsie-logs.txt", "Elsie has disconnected.");
});

client.login(elsieToken);
