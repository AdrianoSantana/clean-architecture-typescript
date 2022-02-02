import { Collection, MongoClient } from 'mongodb'

var client: MongoClient
export const MongoHelper = {
  client,

  async connect (url: string): Promise<void> {
    client = await MongoClient.connect(url)
  },
  
  async disconnect(): Promise<void> {
    client.close()
  },

  getCollection(name: string): Collection {
    return client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return { id: _id.toHexString(), ...collectionWithoutId }
  }
}