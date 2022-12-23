import { IUniversity } from '@app/interfaces/IUniversity';
import { Universities } from '@infra/database/entities/Universities';
import Error from '@infra/error/AppError';

export class CreateUniversity {
  async execute(university: IUniversity) {
    const existUniversity = await Universities.findOne(
      {
        country: university.country,
        name: university.name,
        "state-province": university['state-province']
      })

    if(existUniversity){
      throw new Error('University already exists')
    }

    const newUniversity = new Universities({
      country: university.country,
      name: university.name,
      "state-province": university['state-province'],
      web_pages: university.web_pages,
      alpha_two_code: university.alpha_two_code,
      domains: university.domains,
    })

    await newUniversity.save()

    return newUniversity

  }
}