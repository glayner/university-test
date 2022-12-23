import { Universities } from '@infra/database/entities/Universities';
import Error from '@infra/error/AppError';


export class DeleteUniversity{
  async execute(id: string){
    const university = await Universities.findById(id)

    if(!university){
      throw new Error('University not found!')
    }


    await university.remove()

    return university
  }
}