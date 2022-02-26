from os import getenv
import discord
from src.cogs import reactions

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


@bot.slash_command(guild_ids=[GUILD_ID])
async def hello(ctx):
    await ctx.respond("Hello!")


bot.add_cog(reactions.Reactions(bot))
bot.run(getenv("DISCORD_TOKEN"))
