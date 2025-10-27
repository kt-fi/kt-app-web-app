import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private petService: PetService) { }

  ngOnInit() {
  this.petId.set(this.route.snapshot.paramMap.get('petId'));

  this.petService.getPetById(this.petId()!).subscribe({
      next: (pet) => {
        this.pet.set(pet);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load pet information.');
        console.error(err);
      }
    });

    this.petService.getPet().subscribe({
      next: (pet) => {
        this.pet.set(pet);
        console.log(pet);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load pet information.');
        console.error(err);
      }
    });

  }
}
