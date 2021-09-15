import mongoose from 'mongoose'

const guildSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  admins: [
    {
      userId: {
        type: String,
        required: true
      }
    }
  ]
})

const Guild = mongoose.model('Guild', guildSchema)

export default Guild
