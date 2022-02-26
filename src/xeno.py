from os import getenv

import discord

intents = discord.Intents.all()
bot = discord.Bot(command_prefix='?', intents=intents)
GUILD_ID = 707662348919373925


@bot.event
async def on_ready():
    print(f"We have logged in as {bot.user}")


@bot.event
async def on_member_join(member: discord.Member):
    role = member.guild.get_role(879637214580068353)
    if role is not None:
        await member.add_roles(role, reason='Member joined')


@bot.event
async def on_raw_reaction_add(payload: discord.RawReactionActionEvent):
    if payload is None:
        return
    if payload.channel_id == 943952748179783700:
        if payload.emoji.name == "📩":  # Ping role
            role = payload.member.guild.get_role(943958255275769926)
            if role is not None:
                if role not in payload.member.roles:
                    await payload.member.add_roles(role, reason='Reacted to message')


@bot.event
async def on_raw_reaction_remove(payload: discord.RawReactionActionEvent):
    if payload is None:
        return
    guild = bot.get_guild(payload.guild_id)
    member = None
    for _member in guild.members:
        if _member.id == payload.user_id:
            member = _member
    if payload.channel_id == 943952748179783700:
        if payload.emoji.name == "📩":  # Ping role
            role = member.guild.get_role(943958255275769926)
            if role is not None:
                if role in member.roles:
                    await member.remove_roles(role, reason='Reacted to message')


@bot.slash_command(guild_ids=[GUILD_ID])
async def hello(ctx):
    await ctx.respond("Hello!")


bot.run(getenv("DISCORD_TOKEN"))
