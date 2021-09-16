import { Client, Intents, Collection } from 'discord.js'
import { Routes } from 'discord-api-types/v9'
import { REST } from '@discordjs/rest'
import { config } from 'dotenv'
import fs from 'fs'
import ConnectDB from './config/db'
import Guild from './models/Guild'

const commands = []
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'))
const eventFiles = fs.readdirSync('./src/events').filter((file) => file.endsWith('.js'))
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
client.commands = new Collection()

// .env
config()

// Connect to MongoDB
ConnectDB()

// Command files
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
  commands.push(command.data.toJSON())
}

// Event files
for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.default.once) {
    client.once(event.default.name, (...args) => event.default.execute(...args))
  } else {
    client.on(event.name, (...args) => execute(...args))
  }
}

client.on('interactionCreate', async (interaction) => {
  console.log(interaction)
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.log(error)
  }
})

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN)
const main = async (guildId) => {
  try {
    console.log(process.env.DISCORD_CLIENT_ID)
    await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId), {
      body: commands
    })
  } catch (error) {
    console.log(error)
  }
}

client.on('messageCreate', async (receivedMessage) => {
  try {
    const currentGuild = await Guild.findOne({ guildId: receivedMessage.guildId })
    if (!currentGuild) {
      const newGuild = new Guild({ guildId: receivedMessage.guildId })
      newGuild.save()
      await main(receivedMessage.guildId)
      console.log('Initialization of commands: Success')
    }
  } catch (error) {
    console.log('Initialization of commands: Failed', error)
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
