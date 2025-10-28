import { ChatMessage } from "./chat-message";

export class Chat {
    constructor(
        public chatId: string,
        public petId: string,
        public messages: ChatMessage[],
        public participants: string[], // array of userIds
        public image: string,
        public petName: string
    ) {}

    getFirstMessage(): ChatMessage | null {
        return this.messages.length > 0 ? this.messages[0] : null;
    }

    getLastMessage(): ChatMessage | null {
        return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
    }
}

export interface ChatSummary {
    chatId: string;
    petId: string;
    petName: string;
    lastMessage: string;
    timestamp: Date;
    petImage: string;
}