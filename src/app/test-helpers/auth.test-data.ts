import { LoginData } from '../models/login-data.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';
import { ApiError } from '../models/api-error.interface';
import { RegisterResponse } from '../models/register-response.interface';
import { UserInfo } from 'app/models/user-info.interface';

export const loginData: LoginData = {
  email: 'test@test.com',
  password: 'test'
};

export const registerData: RegisterData = {
  email: 'test@gmail.com',
  password: 'test'
};

export const registerResponse: RegisterResponse = {
  _id: 'fake__id',
  email: 'test@gmail.com',
  email_verified: false
};

export const authData: AuthData = {
  access_token: 'fake_access_token',
  id_token: 'fake_id_token',
  token_type: 'fake_token_type'
};

export const userInfo: UserInfo = {
  email_verified: false,
  email: 'test@gmail.com',
  clientID: 'fake_clienID',
  updated_at: 'now',
  name: 'test',
  picture: 'none',
  user_id: 'fake_user_id',
  nickname: 'test',
  identities: [
    {
      user_id: 'fake_user_id',
      provider: 'fake_provider',
      connection: 'fake_connection',
      isSocial: false
    }
  ],
  created_at: 'now',
  sub: 'fake_sub'
};

export const apiError: ApiError = {
  error: 'fake_error',
  error_description: 'fake_error_description'
};
