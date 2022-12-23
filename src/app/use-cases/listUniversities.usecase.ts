import { IUniversityEntity, Universities } from '@infra/database/entities/Universities';
import { FilterQuery } from 'mongoose';
import { paginate } from '../../helpers/paginage';

interface IRequestListUniversities {
  country?: string;
  page?: number;
}

export class ListUniversities {
  async execute({ country, page = 1 }: IRequestListUniversities) {
    const perPage = 20;

    const filter: FilterQuery<IUniversityEntity> = {}

    if (country) filter.country = country

    const total = await Universities.count(filter)

    const universities =await Universities.find(filter)
      .limit(perPage)
      .skip((page - 1) * perPage)

    return paginate({
      data: universities,
      page,
      perPage,
      total
    })
  }
}