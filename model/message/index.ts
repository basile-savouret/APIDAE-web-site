export interface Message {
    id: string
    writerFirstname: string
    writerLastname: string
    message: string
    timestamp: string
    pinned: boolean
    room: MessageRoom
}

export type MessageRoom = "studentRoom" | "teacherRoom"

export interface CreateMessageCommand {
    message: string
    timestamp: string
}