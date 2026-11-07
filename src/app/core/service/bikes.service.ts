import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Bikes } from "../models/bikes.model";
import { HttpClient } from "@angular/common/http";

type FirebaseBike = Omit<Bikes, "id"> & { id?: unknown};

@Injectable({ providedIn: "root" })
export class BikesService {
  private http = inject(HttpClient);
  private apiUrl = "https://petlar-3b087-default-rtdb.firebaseio.com/Bike";
  private sufix = ".json"


  getAll(): Observable<Bikes[]> {
    return this.http
    .get<Record<string, FirebaseBike> | null>(this.apiUrl + this.sufix).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([id, bike]) => {
          const { id: _ignoredId, ...bikeData } = bike;
          return { id, ...bikeData };
        });

      }),
      );
    }
    getById(id: string): Observable<Bikes | null> {
        return this.http
        .get<FirebaseBike | null>(`${this.apiUrl}/${id}${this.sufix}`)
        .pipe(
            map((response) => {
                if (!response) {
                    throw new Error(`Bike não encontrada`);
                }
                const { id: _ignoredId, ...bikeData } = response;
                return { id, ...bikeData };
            })
        )
  }

    create(bike: Omit<Bikes, "id">): Observable<Bikes> {
        return this.http.post<{ name: string }>(this.apiUrl + this.sufix, bike).pipe(
            map((response) => {
                return { id: response.name, ...bike };
            })
        );
    }

    update(id: string, bike: Omit<Bikes, "id">): Observable<Bikes> {
        return this.http
        .put<Omit<Bikes, "id">>
        (this.apiUrl + this.sufix, bike).pipe(
            map((response) => {
              return { id, ...bike };
            }))    
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
    }
}