export interface Method {
    name: string
    description: string
    code: string
    params?: {
        [key: string]: string
    }[]
    return?: string[]
}