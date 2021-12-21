require("dotenv").config();
const { Telegraf } = require("telegraf");

const PORT = process.env.PORT || 8003;
const TOKEN = process.env.TOKEN;
const URL = process.env.URL;
const bot = new Telegraf(TOKEN);

const tlsOptions = {
    key: fs.readFileSync("server-key.pem"),
    cert: fs.readFileSync("server-cert.pem"),
    ca: [
        // This is necessary only if the client uses a self-signed certificate.
        fs.readFileSync("client-cert.pem"),
    ],
};

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

// bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
// bot.startWebhook(`/bot${TOKEN}`, tlsOptions, PORT);

bot.launch({
    webhook: {
        domain: URL,
        port: PORT,
    },
});

// bot.launch()
//     .then(() => console.log("Bot running ..."))
//     .catch((err) => console.log(err));
