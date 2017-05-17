import { ScriptModel } from 'app/models/script.model';
import { UserModel } from 'app/models/user.model';

export interface ExecutionModel {
  end_date: Date
  id: string
  params: any
  progress: number
  results: any
  script_id: string
  start_date: Date
  status: string
  script?: ScriptModel
  user?: UserModel
}
