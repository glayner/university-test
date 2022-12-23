import { IUniversity } from "@app/interfaces/IUniversity";
import { Universities } from "@infra/database/entities/Universities";
import { axiosData } from "./axios";
import { AppDataSource } from '../infra/database/index';

export class CreateCollection {


  async handleData(country: string) {

    const universitiesData = await axiosData(country).then(res => {
      return res
    })

   const result = await Promise.all( universitiesData.map(async (university: IUniversity) => {
    const newUniversity = new Universities({
      alpha_two_code : university.alpha_two_code,
      name : university.name,
      country : university.country,
      domains : university.domains,
      'state-province' : university['state-province'],
      web_pages : university.web_pages,
    })

    await newUniversity.save()

    return newUniversity
  }))

  return result
  }
}