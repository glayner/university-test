import { CreateUniversity } from '@app/use-cases/createUniversity.usecase';
import { ListUniversities } from '@app/use-cases/listUniversities.usecase';
import { ShowUniversity } from '@app/use-cases/showUniversity.usecase';
import { Request, Response } from "express";
import { ListUniversityViewModel } from '../view-model/list-university-view-model';
import { IUniversity } from '@app/interfaces/IUniversity';
import { UpdateUniversity } from '../../../app/use-cases/updateUniversity.usecase';
import { DeleteUniversity } from '@app/use-cases/deleteUniversity.usecase';

export class UniversityController {


  async list(request: Request, response: Response): Promise<Response> {
    const { country, page } = request.query

    const listService = new ListUniversities()

    const result = await listService.execute({
      country: country && String(country), page: page && Number(page)
    })

    return response.json({
      ...result,
      data: result.data.map(ListUniversityViewModel.toListHttp)
    })
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createService = new CreateUniversity()
    const university = await createService.execute(request.body as IUniversity)
    return response.json(university)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showService = new ShowUniversity()
    const university = await showService.execute(id)
    return response.json(university)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const {
      name,
  web_pages,
  domains,
    } = request.body

    const updateservice = new UpdateUniversity()

    const university = await updateservice.execute({
      id: String(id),
      name,
      web_pages,
      domains,})

    return response.json(university)
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteService = new DeleteUniversity()
    const university = await deleteService.execute(id)
    return response.json(university)
  }
}