import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  users: CreateUserDto[] = [];
  async create(user: CreateUserDto) {
    const createdUser = new this.userModel({
      username: user.username,
      password: await bcrypt.hash(user.password, 12),
    });
    return await createdUser.save();
  }
  async findAll() {
    return await this.userModel.find().exec();
  }
  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('Could not find User');
    }
    // user.username = user.username.toUpperCase();
    // user.save();
    return user;
  }
}
