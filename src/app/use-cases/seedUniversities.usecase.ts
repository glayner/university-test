import { CreateCollection } from '@helpers/createCollection';
import { Universities } from '@infra/database/entities/Universities';

export class SeedUniversities {

  async execte() {

    const countUniversities = await Universities.count()
    if (countUniversities > 0) return

    const createCollection = new CreateCollection()

    await Promise.all(['argentina', 'brazil', 'chile', 'colombia',
      'paraguai', 'peru', 'suriname', 'uruguay']
      .map(async country => await createCollection.handleData(country)))
  }
}