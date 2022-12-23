import * as mongoose from "mongoose"


export const AppDataSource = {
  initialize:async ()=> {
    mongoose.set('strictQuery', false)

    const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/universities'

    console.log(mongoUri)

    mongoose.connect(mongoUri)
  }
}

