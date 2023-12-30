import { ResponseSuccessModel } from "./response.model";

export interface UserModel extends ResponseSuccessModel {
  data: UserDataModel;
}

export interface UserDataModel {
  id: number;
  oauth_provider: string;
  oauth_id: string;
  display_name: string;
  email: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}
