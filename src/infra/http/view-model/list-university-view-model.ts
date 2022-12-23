import { UniversityData } from "@infra/database/entities/Universities";

export class ListUniversityViewModel{
  static toListHttp(universities: UniversityData){
    return {
      _id: universities._id,
      nome: universities.name,
      país: universities.country,
      estado: universities["state-province"]
    }
  }
}