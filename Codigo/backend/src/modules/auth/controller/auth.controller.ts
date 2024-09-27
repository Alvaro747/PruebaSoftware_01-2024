import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Handles the login request.
  // Authenticates the user locally and generates JWT tokens.
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    const { refreshToken, accessToken } = await this.authService.login(user);

    // Redirect to frontend login URL
    return { refreshToken, accessToken };
  }

  // Handles the registration request for new users.
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    // Registers a new user
    await this.authService.register(user);
    // Redirect to frontend login URL
    return 'User registered successfully! Please login to continue.';
  }
}
