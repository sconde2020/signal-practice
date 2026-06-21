import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class UserApi {
    private http = inject(HttpClient);
    private readonly url = 'https://jsonplaceholder.typicode.com/users';

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.url}/${id}`);
    }

    getFiltered(city?: string, company?: string): Observable<User[]> {
        let params = new HttpParams();
        if (city) params = params.set('address.city', city);
        if (company) params = params.set('company.name', company);
        return this.http.get<User[]>(this.url, { params });
    }
}
