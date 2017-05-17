import { UserModel } from 'app/models/user.model';

export interface ScriptModel {
  id?: string
  name: string
  slug: string
  status: string
  user_id: string
  created_at: Date
  user?: UserModel
  public: boolean
}
