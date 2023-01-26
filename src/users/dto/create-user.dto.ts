export class CreateUserDto {
    id: number
    type: string
    name: string | null
    user: string
    password?: string
    password_hash: string
}
