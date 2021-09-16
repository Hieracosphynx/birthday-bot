import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const PASSWORD = process.env.MONGODB_PASSWORD
const ConnectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mdlc:${PASSWORD}@cluster0.x83ii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    console.log('Successfully connected to database')
  } catch (err) {
    console.error(err.message)
    console.log('Cannot connect to database')
  }
}

export default ConnectDB
