import { model, Schema, Model, Document, Types } from 'mongoose';

export interface IUniversityEntity extends Document{
  alpha_two_code: string;
  name: string;
  web_pages: string[];
  'state-province': string | null;
  domains: string[];
  country: string;
};

export type UniversityData = (IUniversityEntity & {
  _id: Types.ObjectId;
})

const UniversitySchema = new Schema<IUniversityEntity>({
  alpha_two_code: { type: String, required: true },
  name: { type: String, required: true },
  web_pages: {type: [String], required: true},
  'state-province': {type: String, required: false, default: null},
  domains: {type: [String], required: true},
  country: { type: String, required: true },
});

export const Universities: Model<IUniversityEntity> = model('university', UniversitySchema);

