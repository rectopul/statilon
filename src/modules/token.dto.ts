import { CreateUserDto } from "src/users/dto/create-user.dto"

export type GenerateTokenDTO ={
    user: CreateUserDto
    jti: string
}