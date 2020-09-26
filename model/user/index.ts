export interface User {
    id: string
    email: string
    firstname: string
    lastname: string
    roles: userRole[]
}

export type userRole = "teacher" | "student" | "admin"

export interface CreateUserCommand {
    email: string
    firstname: string
    lastname: string
    roles: userRole[]
}