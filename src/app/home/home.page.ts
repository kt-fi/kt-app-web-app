import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { Router, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard, IonGrid, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, RouterLinkActive],
})
export class HomePage {
  constructor(private route: Router){}

  goToPage(){
    this.route.navigate(['/pet/contact']);
  }
}
