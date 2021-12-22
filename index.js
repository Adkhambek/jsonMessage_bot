require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);
const app = express();

app.get("/", (req, res) => res.send("Test"));

bot.use((ctx, next) => {
    if (ctx.update.message.text === "/start") {
        ctx.reply(
            "🤖 Hello, I'm JsonBot. Send me any message, I will convert to JSON"
        );
    } else {
        const messageToJson = JSON.stringify(ctx.update, null, 2);
        ctx.replyWithMarkdown(`\`${messageToJson}\``);
    }
});

bot.telegram.setWebhook(URL + bot.secretPathComponent());
app.use(bot.webhookCallback("/" + bot.secretPathComponent));

app.listen(PORT, () => {
    console.log("server is running ...");
});

// bot.launch()
//     .then(() => console.log("Bot running ..."))
//     .catch((err) => console.log(err));
