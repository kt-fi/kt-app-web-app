import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/services/pet';
import { Pet } from 'src/app/pet';
import { addIcons } from 'ionicons';
import { call, chatbubbles } from 'ionicons/icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonItem, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, CommonModule, FormsModule]
})
export class ContactPage implements OnInit {

  petId: string ="";

  currentPet = signal<Pet | null>(null);

  constructor(private route: ActivatedRoute, private petService: PetService) {
      addIcons({call,chatbubbles}); }

  ngOnInit() {
  addIcons({  });
  
   this.petId = this.route.snapshot.paramMap.get('id') || "";
   console.log("Contact Page for pet ID:", this.petId);

   this.petService.getPetById(this.petId).subscribe({
    next: (pet: Pet | null) => {
      this.currentPet.set(pet);
      console.log(pet)
    },
    error: (error) => {
      console.error("Error fetching pet data:", error);
    }
   });
  }

}
