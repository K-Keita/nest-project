import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.authService.login(createUser);
  }
}
