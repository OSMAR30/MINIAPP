const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

const APP_URL = process.env.APP_URL;

// Lógica del bot
bot.start((ctx) => {
  ctx.reply(`Bienvenido a tu Mini App en Vercel!`, {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Abrir Mini App', web_app: { url: APP_URL } }
      ]]
    }
  });
});

bot.help((ctx) => ctx.reply('Envía /start para comenzar.'));

// Endpoint para que Telegram envíe los mensajes (Webhook)
app.post('/api/webhook', (req, res) => {
  bot.handleUpdate(req.body, res);
});

app.get('/', (req, res) => {
  res.send('Bot Serverless is running!');
});

module.exports = app;
