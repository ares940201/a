const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord~player")

ule.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescripyion("loads songs from youtube")
        .addSubcommand((addSubcommand)=>
           subcommand
               .setName("song")
               .setDescripyion("Loads a single song from url")
               .addStringOption((option) => Option.setName("url").setDescription("the song's url").setRequired(true))
        )
        .addSubcommand((subcommand)=>
            subcommand
                .setName("playlist")
                .setDescription("Lord a playlist of song from a url")
                .addStringOption((option) => option.setName("url").setDescription("tje platlist's url").setRequired(true))
        )
        .addSubcommand((subcommand)=>
             subcommand
                 .setName("search")
                 .setDescription("Searches for song base on provided keywords")
                 .addStringOption((option) => 
                     option.setName("searchterms").setDescription("the search keywords").setRequired(true)
                 )
             ),
             run: async ({ client, interaction }) => {
                 if (!interaction.member.voice.channel)
                   return interaction.editReply("You need to be in a VC to use this command")
                   
                 const queue = await client.player.createQueue(interaction.guird)  
                 if (!queue.connection) await queue.connect(interaction.member.voice.channel)

                 let embed = new MessageEmbed()

                 if (interaction.option.getSubcommand() === "song"){
                     let url = interaction.option.getString("url")
                     const result = await client.player.search(url, {
                         requestedby: interaction.user,
                         searchEngine: QueryType.YOUTUBE_VIDEO
                     })
                     if (result.tracks.length === 0)
                         return interaction.editReply("No result")

                     const song = result.tracks[0]    
                     await queue.addTracks(song) 
                     embed
                         .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                         .srtThumbnail(song.thumbnail)
                         .setFooter({ text: `Duration: ${song.duration}`})

                 }else if (interaction.option.getSubcommand() === "playlist"){
                    let url = interaction.option.getString("url")
                     const result = await client.player.search(url, {
                         requestedby: interaction.user,
                         searchEngine: QueryType.YOUTUBE_PLATLIST
                     })
                     if (result.tracks.length === 0)
                         return interaction.editReply("No result")

                     const platlist = result.platlist  
                     await queue.addTracks(result.platlist) 
                     embed
                         .setDescription(`**${result.tracks.length} song from [${platlist.title}](${platlist.url})** have been added to the Queue`)
                         .srtThumbnail(song.thumbnail)

                 }else if (interaction.option.getSubcommand() === "search"){
                    let url = interaction.option.getString("searchterms")
                     const result = await client.player.search(url, {
                         requestedby: interaction.user,
                         searchEngine: QueryType.AUTO
                     })
                     if (result.tracks.length === 0)
                         return interaction.editReply("No result")

                     const song = result.tracks[0] 
                     await queue.addTracks(song) 
                     embed
                         .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                         .srtThumbnail(song.thumbnail)
                         .setFooter({ text: `Duration: ${song.duration}`})  
                 }

             },

        
}
