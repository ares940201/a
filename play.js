const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord~player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescripyion("loads songs from youtube")
        addSubcommand((addSubcommand)=>
           subcommand
               .setName("song")
               .setDescripyion("Loads a single song from url")
               .addString0ption((Option) => Option.setName("url").setDescription("the song's url").setRequired(true)))
    
        
}
