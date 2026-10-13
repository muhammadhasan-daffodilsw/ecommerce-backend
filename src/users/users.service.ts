import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo.js';
import { UserMeResponseDto, UserResponseDto, PutUserDto, PatchUserDto } from './dto.js';

@Injectable()
export class UsersService {

    constructor (private readonly usersRepo : UsersRepository)
    {}

    getMe(id : string) : UserMeResponseDto
    {
        return new UserMeResponseDto
    }

    getUserByID(id : string) : UserResponseDto
    {
        return new UserResponseDto()
    }

}