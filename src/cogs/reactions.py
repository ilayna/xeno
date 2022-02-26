import discord
from discord.ext import commands


class Reactions(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self._last_member = None

    @commands.Cog.listener()
    async def on_raw_reaction_add(self,payload: discord.RawReactionActionEvent):
        if payload is None:
            return
        if payload.channel_id == 943952748179783700:
            if payload.emoji.name == "📩":  # Ping role
                role = payload.member.guild.get_role(943958255275769926)
                if role is not None:
                    if role not in payload.member.roles:
                        await payload.member.add_roles(role, reason='Reacted to message')

    @commands.Cog.listener()
    async def on_raw_reaction_remove(self, payload: discord.RawReactionActionEvent):
        if payload is None:
            return
        guild = self.bot.get_guild(payload.guild_id)
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
