import { MessageEmbed } from 'discord.js'

const Birthday = (client) => {
  const messageEmbed = new MessageEmbed()
    .setColor('#ff4400')
    .addFields({ name: 'Happy Birthday', value: '<@840199203414474752>' })
  const channel = client.channels.cache.get('808525314891841556')
  channel.send({ embeds: [messageEmbed] })
}

export default Birthday
