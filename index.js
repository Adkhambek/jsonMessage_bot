require("dotenv").config();
const { Telegraf } = require("telegraf");
const fs = require("fs");

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
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

bot.launch({
    webhook: {
        domain: "https://adhamdev.uz/",
        port: 4543,
    },
});

// bot.launch()
//     .then(() => console.log("Bot running ..."))
//     .catch((err) => console.log(err));
