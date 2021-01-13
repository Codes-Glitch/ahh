require("dotenv").config();
require("./listeners/process");
const Unicron = require("./classes/Unicron");
const client = new Unicron();
(async function() {
   await client.registerItems("../items/");
   await client.registerCommands("../commands/");
   await client.registerEvents("../events/")
                   
const status = [
    `!help | 4882 Server and 91773 User `,
    `Made By 𝙁𝘾 么 Glitch Editz#5631`
    //file : src/U/can add another
  ];
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], {
      type: "STREAMING"
    });
  }, 5000);
  const fetch = require("node-fetch");

 setInterval(async () => {
    await fetch("https://bot-saya-m.glitch.me").then(console.log("sukses"));
  }, 280);
  await client.login(process.env.BOT_TOKEN);
})();
