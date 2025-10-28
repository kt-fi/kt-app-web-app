import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  IonFooter,
  IonSpinner,
  LoadingController,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/models/chat';

import { addIcons } from 'ionicons';
import { sendOutline, addOutline, cameraOutline } from 'ionicons/icons';
import { ChatMessage } from 'src/app/models/chat-message';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonFooter,
    IonIcon,
    IonButton,
    IonItem,
    IonList,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ChatPage implements OnInit {
  chatId: string | null = null;
  chat!: Chat | null;
  chatMessages!: ChatMessage[] | null;
  user: User | null = null;
  petId: any | null = null;
  petName: string | null = null;
  recipientId: any | null | undefined;
  isLoading: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private AuthService: AuthService,
    private loaderCtrl: LoadingController
  ) {
    addIcons({ sendOutline, cameraOutline, addOutline });
  }

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.chatService.getChatById(this.chatId!);
    this.getChat();
    this.getChatMessages();
    this.user = this.AuthService.user;
    //Create Temp User if not exists, or get user from localStorage

    console.log(this.user)
    console.log(this.petName)
    console.log(this.recipientId)
  }

  private getChat() {
    let _subscription_1 = this.chatService.getChat().subscribe((chat) => {
      this.chat = chat;
      this.petId = chat!.petId;
      this.petName = this.petId.petName;
      this.recipientId = this.chat!.participants.find(
        (participant: any) => participant._id !== this.user!.userId
      );
    });
    this.subscriptions.push(_subscription_1);
  }

  private getChatMessages() {
    this.loaderCtrl
      .create({
        message: 'Loading chat messages...',
      })
      .then((loading) => {
        loading.present();
        let _subscription_2 = this.chatService
          .getChatMessages()
          .subscribe((messages) => {
            this.chatMessages = messages;
            console.log(messages);
            loading.dismiss();
          });
          this.subscriptions.push(_subscription_2);
      });
    
  }

  sendMessage(messageInput: any) {
    let recipient: string;
    let messageText = messageInput.value?.trim();
    if (messageText && this.chatId) {
      const newMessage = new ChatMessage(
        this.chatId,
        this.user!.userId,
        messageText,
        [1, 1]
      );
      recipient = this.recipientId!._id;
      console.log(newMessage);
      this.chatService.sendMessage(newMessage, recipient);
      messageInput.value = '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
