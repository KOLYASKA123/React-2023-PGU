import mongoose from 'mongoose'

const mongodbUrl = "mongodb://127.0.0.1:27017/"
const dbName = "techDb"

export const dbConnect = async() => {
  try {
    await mongoose.connect(`${mongodbUrl}${dbName}`)
    console.log('[DB] Connect success')
  } catch (error) {
    console.log(`[DB] Connect error: ${error.message}`)
  }
}