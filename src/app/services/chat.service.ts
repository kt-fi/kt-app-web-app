import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';
import { ChatMessage } from '../models/chat-message';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { call } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private url = environment.url;

  chatRecipient = new BehaviorSubject<any>(null);

  chats = new BehaviorSubject<Chat[]>([]);

  chat = new BehaviorSubject<Chat | null>(null);

  chatMessages = new BehaviorSubject<ChatMessage[] | null>(null);

  constructor(private http: HttpClient) { }

  getChat() {
    return this.chat.asObservable();
  }

  getChats() {
    return this.chats.asObservable();
  }

  getChatRecipient() {
    return this.chatRecipient.asObservable();
  }

  getChatMessages() {
    return this.chatMessages.asObservable();
  }

 
  getAllChats(userId: string) {
    this.http.get<Chat[]|any[]>(`${this.url}/chat/getAllUserChats/${userId}`).subscribe({
      next: (response) => {
        let chats = response.map(chat => {
          return new Chat(
            chat._id,
            chat.petId._id,
            chat.messages,
            chat.participants,
            chat.petId.photoIds[0],
            chat.petId.petName
          );
        });
        console.log(chats);
        this.chats.next(chats);
      }
    });
  }
  //Get Create Chat
public getOrCreateChat(chatId: string | null, senderUserData: {userId: string}, recipientData: {userId: string}, petId: string) {
  return this.http.post<Chat>(`${this.url}/chat/createChat`, { chatId, senderUserData, recipientData, petId }).pipe(
    take(1),
    tap((data) => {
      console.log(data);
    })
  )
}

  public getChatById(id: string): Chat | undefined | any {
    this.chatMessages.next(null);
     this.http.get<Chat | any>(`${this.url}/chat/getChatById/${id}`).subscribe({
      
      next: (chat) => {
        console.log(chat)
        let messages = chat.chat.messages.map((msg: any) => new ChatMessage(
          msg.chatId,
          msg.senderId._id,
          msg.message,
          msg.location ,
          msg.image,
          msg.seen,
          msg.timestamp,
          msg.seenAt
        ));
        
        this.chat.next(chat.chat); 
        return this.chatMessages.next(messages);
      }
    });
  }

  public sendMessage(message: ChatMessage, recipient: string): void {
     this.http.post(`${this.url}/chat/sendMessage`, {message, recipient}).subscribe({
      next: (response) => {
        return console.log('Message sent successfully:', response);
      },
      error: (error) => {
        return console.error('Error sending message:', error);
      }
    });

  }
}
