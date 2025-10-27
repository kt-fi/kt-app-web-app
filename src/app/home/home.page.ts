import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle, LoadingController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLinkActive } from "@angular/router";
import { Pet } from '../pet';
import { PetService } from '../services/pet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard, IonGrid, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, RouterLinkActive],
})
export class HomePage implements OnInit {

  pet = signal<Pet | null>(null);
  petId = signal<string | null>(null);

  errorMessage = signal<string | null>(null);

  constructor(private router: Router, private route: ActivatedRoute, private petService: PetService, private loaderCtrl: LoadingController){}

  ngOnInit() {
  }

    goToPage() {
    this.router.navigate(['/pet/info/68ebc8eba76de6658f5275b7']);
  }
}
