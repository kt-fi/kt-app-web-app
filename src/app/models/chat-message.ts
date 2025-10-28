export class ChatMessage {
    constructor(
        public chatId: string,
        public senderId: string,
        public message: string,
        public location: [number, number],
        public image?: string,
        public seen?: boolean,
        public timestamp: Date = new Date(),
        public seenAt?: Date
    ) {}
}