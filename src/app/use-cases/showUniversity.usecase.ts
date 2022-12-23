import { Universities } from '@infra/database/entities/Universities';

export class ShowUniversity{
  async execute(id: string){
    return await Universities.findById(id)
  }
}