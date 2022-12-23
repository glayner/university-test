import { Universities } from '@infra/database/entities/Universities';
import Error from '@infra/error/AppError';

interface IUpdateUniversityRequest{
  id: string;
  name: string;
  web_pages:string[];
  domains: string[];
}

export class UpdateUniversity{
  async execute(data: IUpdateUniversityRequest){
    const university = await Universities.findById(data.id)

    if(!university){
      throw new Error('University not found!')
    }

    university.name = data.name;
    university.domains = data.domains;
    university.web_pages = data.web_pages;

    await university.save()

    return university
  }
}