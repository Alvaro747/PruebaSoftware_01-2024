import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/service/user.service';
import { ResponseToken, TokenPayloadType } from '@common/types/token.type';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ResponseUserDto } from '@modules/user/dto/response-user.dto';
import {
  comparePasswords,
  encryptPassword,
} from '@common/utils/generator.util';
import { LoginUserDto } from '@modules/auth/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user.
   * @param user The user to be registered.
   * @returns The registered user.
   */
  async register(user: CreateUserDto): Promise<TokenPayloadType> {
    // Validates if the user already exists
    const userValidate = await this.usersService.validateUser(user.email);

    if (userValidate) {
      throw new UnauthorizedException(
        'email already registered with another provider.',
      );
    }

    // encrypt the user password before saving it
    const encryptedPassword = await encryptPassword(user.password);

    // create the user payload with the encrypted password and the provider 'local' to identify the user
    const userPayload: CreateUserDto = {
      ...user,
      password: encryptedPassword,
    };
    // create user and related entities
    const userAndEntitiesCreate = await this.createUserAndRelatedEntities(
      userPayload,
    );

    // return the access token and refresh token
    return userAndEntitiesCreate;
  }

  /**
   * Logs in a user and generates JWT token.
   * @param user The authenticated user.
   * @returns An object containing access token.
   */
  async login(user: LoginUserDto): Promise<ResponseToken> {
    // find user by email
    const userFound = await this.usersService.validateUser(user.username);
    const validatedPassword = await comparePasswords(
      user.password,
      userFound?.password,
    );

    if (!userFound || !validatedPassword) {
      throw new UnauthorizedException('username or password incorrect');
    }

    delete userFound.password;
    return this.getTokens({ user: userFound });
  }

  /**
   * Generates JWT tokens for a user.
   * @param user The user to generate tokens for.
   * @returns An object containing access token and refresh token.
   */
  private getTokens(payload: TokenPayloadType): ResponseToken {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_EXPIRES_REFRESH_TOKEN_IN,
      }),
    };
  }

  /**
   * Creates a user and associated entities such as account and subscription plan.
   * @param userData The data to create the user.
   * @param accountData The data to create the account.
   * @returns An object containing user, account, and user subscription plan.
   */
  private async createUserAndRelatedEntities(
    userData: CreateUserDto,
  ): Promise<TokenPayloadType> {
    const user = await this.createUser(userData);

    return { user };
  }

  /**
   * Creates a new user.
   * @param userData The data to create the user.
   * @returns The created user.
   */
  private async createUser(userData: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(userData) as Promise<ResponseUserDto>;
  }
}
