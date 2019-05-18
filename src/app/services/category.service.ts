import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { environment } from '../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/category`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/category/${id}`);
    }

    save(user: User) {
        return this.http.post(`${environment.apiUrl}/category`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/category/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/category/${id}`);
    }
}