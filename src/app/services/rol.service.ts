import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Rol } from '../models';
import { environment } from '../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RolService {
    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get<Rol[]>(`${environment.apiUrl}/rol`);
    }

    getById(id: number) {
        return this.http.get<Rol>(`${environment.apiUrl}/rol/${id}`);
    }

    register(rol: Rol) {
        return this.http.post(`${environment.apiUrl}/rol`, rol);
    }

    update(rol: Rol) {
        return this.http.put(`${environment.apiUrl}/user/${rol.id}`, rol);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/rol/${id}`);
    }
}