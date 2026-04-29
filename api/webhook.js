import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Bienvenido a tu Mini App en Vercel!`, {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Abrir Mini App', web_app: { url: process.env.APP_URL } }
      ]]
    }
  });
});

bot.help((ctx) => ctx.reply('Envía /start para comenzar.'));

export default async (req, res) => {
  try {
    await bot.handleUpdate(req.body, res);
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
};
