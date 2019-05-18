import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { environment } from '../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    //Usuarios
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/registro`, user);
    }

    save(user: User) {
        return this.http.post(`${environment.apiUrl}/user`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/user/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/user/${id}`);
    }
}