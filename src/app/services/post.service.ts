import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models';
import { environment } from '../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
    constructor(private http: HttpClient) { }

    //Usuarios
    getAll() {
        return this.http.get<Post[]>(`${environment.apiUrl}/post`);
    }

    getById(id: number) {
        return this.http.get<Post>(`${environment.apiUrl}/post/${id}`);
    }

    save(post: Post) {
        return this.http.post(`${environment.apiUrl}/post`, post);
    }

    update(post: Post) {
        return this.http.put(`${environment.apiUrl}/post/${post.id}`, post);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/post/${id}`);
    }
}