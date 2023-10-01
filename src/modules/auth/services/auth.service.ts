import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
// import { UsersService } from '../app/users/users.service';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/modules/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: UserEntity;

    user = await this.userService.findOneOrFail(email);

    if(!user)
      return null
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async logIn(user) {
    const payload = {sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

}