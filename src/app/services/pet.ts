import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { take, map, tap, catchError } from 'rxjs/operators';
import { Pet } from '../pet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  _pet = new BehaviorSubject<Pet | null>(null);

  url = environment.url + '/pets';


  constructor(private httpClient: HttpClient) { }

  getPet(): Observable<Pet | null> {
    return this._pet.asObservable();
  }
  getPetById(petId: string) {
    return this.httpClient
      .get<any>(`${this.url}/getPetById/${petId}`)
      .pipe(
        map((data: any) => {
          if (data) {
            const pet = new Pet(
              data.userId,
              data._id,
              data.petName,
              data.age,
              data.status,
              data.description,
              data.photoIds,
              data.dateLastSeen,
              data.locationLastSeen,
              data.spottedLocations,
              data.otherInfo
            );
            this._pet.next(pet);
            return pet;
          } else {
            this._pet.next(null);
            return null;
          }
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching pet by ID'));
        })
      );
  }
}
