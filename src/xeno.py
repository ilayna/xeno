from os import getenv

import discord

bot = discord.Bot()
GUILD_ID = 707662348919373925


@bot.event
async def on_ready():
    print(f"We have logged in as {bot.user}")


@bot.slash_command(guild_ids=[GUILD_ID])
async def hello(ctx):
    await ctx.respond("Hello!")


bot.run(getenv("DISCORD_TOKEN"))
