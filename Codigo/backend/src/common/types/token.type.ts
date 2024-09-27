import { ResponseUserDto } from '@modules/user/dto/response-user.dto';

export type TokenPayloadType = {
  user: ResponseUserDto;
};

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};
