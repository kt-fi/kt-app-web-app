import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Pet } from 'src/app/pet';
import { PetService } from 'src/app/services/pet';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss'],
})
export class PetInfoComponent  implements OnInit {

  pet = signal<Pet | null>(null);
  errorMessage = signal<string | null>(null);

  petId = signal<string | null>(null);

  constructor(private route: ActivatedRoute, private router: Router, private petService: PetService, private loaderCtrl: LoadingController) { }

  ngOnInit() {
 this.petId.set(this.route.snapshot.paramMap.get('petId'));
    this.loaderCtrl.create({
      message: 'Loading pet information...'
    }).then(loader => {
      loader.present();
      this.petService.getPetById(this.petId()!).subscribe({
        next: (pet) => {
          this.pet.set(pet);
          loader.dismiss();
        },
        error: (err) => {
          this.errorMessage.set('Failed to load pet information.');
          console.error(err);
          loader.dismiss();
        }
      });
    });
  }




}
