import { MessageEmbed } from 'discord.js'

const Birthday = (client) => {
  const messageEmbed = new MessageEmbed()
    .setColor('#ff4400')
    .addFields({ name: 'Happy Birthday', value: '<@531147604558348288>' })
  const channel = client.channels.cache.get('840199203414474752')
  channel.send({ embeds: [messageEmbed] })
}

export default Birthday
