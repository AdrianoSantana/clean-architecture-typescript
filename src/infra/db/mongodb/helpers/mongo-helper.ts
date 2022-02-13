import { Collection, MongoClient } from 'mongodb'

var client: MongoClient
export const MongoHelper = {
  client,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    client = await MongoClient.connect(url)
  },
  
  async disconnect(): Promise<void> {
    client.close()
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    await this.connect(this.url)
    return client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return { id: _id.toHexString(), ...collectionWithoutId }
  }
}