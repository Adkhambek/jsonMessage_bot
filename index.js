require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const URL = process.env.URL;
const secretPath = process.env.SECRET_PATH;
const bot = new Telegraf(TOKEN);

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

if (process.env.NODE_ENV === "production") {
    bot.telegram.setWebhook(URL + secretPath);
    const app = express();
    app.get("/", (req, res) => res.send("Test"));
    app.use(bot.webhookCallback(secretPath));
    app.listen(PORT, () => {
        console.log("server is running ...");
    });
} else {
    bot.launch()
        .then(() => console.log("Bot running ..."))
        .catch((err) => console.log(err));
}
