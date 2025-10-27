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
      .get<Pet | string>(`${this.url}/getPetById/${petId}`)
      .pipe(
        tap((data: any) => {
          if (data) {
            console.log(data)
            this._pet.next(new Pet(
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
            ));
          }
          return this._pet.value;
        }),
        catchError((error) => {
          return throwError(() => new Error('Error fetching pet by ID'));
        })
      );
    }
  }
