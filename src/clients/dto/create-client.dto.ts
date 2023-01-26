export class CreateClientDto {
    id: number
    secret_seed: string | null
    mnemonic: string | null
    module: string | null
    ip: string | null
    status: string
    created_at: Date
    updated_at: Date
}
