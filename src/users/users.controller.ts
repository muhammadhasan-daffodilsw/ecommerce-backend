import { Controller, Get, Post, Patch, Put, Delete , Request, Param} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UserResponseDto, UserMeResponseDto, PutUserDto, PatchUserDto} from './dto.js'

@Controller('users')
export class UsersController {
    constructor (private readonly userService : UsersService){}

    @Get('me')
    getMe(@Request() req : any) : UserMeResponseDto
    {
        return this.userService.getMe(req.user.id);
    }

    @Get(':id')
    getUserById(@Param('id') id : string) : UserResponseDto
    {
        return this.userService.getUserByID(id);   
    }

}
