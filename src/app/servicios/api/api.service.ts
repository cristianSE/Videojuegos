import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000'; // Base URL del backend

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, usuario); // URL completa para el registro de usuario
  }

  loginUsuario(credenciales: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciales); // URL completa para el inicio de sesión
  }

  obtenerUsuarios():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/tablausuarios`);
  }
  
  buscarUsuario(dato:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/buscarusuario/${dato}`);
  }

  eliminarUsuario(dato: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminarusuario/${dato}`);
  }

  agregarVideojuego(videojuego: any): Observable<any> {
    // Añadir un console.log para verificar el contenido del objeto videojuego antes de enviar la solicitud
    console.log('Objeto videojuego:', videojuego);
    
    return this.http.post<any>(`${this.apiUrl}/agregar-videojuego`, videojuego)
      .pipe(
        catchError(error => {
          console.error('Error al enviar la solicitud:', error);
          throw error; // Relanzar el error para que el componente pueda manejarlo
        })
      );
  }

  subirImagen(imagenData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subir-imagen`, imagenData)
      .pipe(
        catchError(error => {
          console.error('Error al subir la imagen:', error);
          throw error; // Relanzar el error para que el componente pueda manejarlo
        })
      );
    }
    sacarImagenes(): Observable<{ imagenes: { id: number; imagen: string; }[] }> {
      return this.http.get<{ imagenes: { id: number; imagen: string; }[] }>(`${this.apiUrl}/mostrarimagenes`)
        .pipe(
          catchError(error => {
            console.error('Error al obtener imágenes:', error);
            return throwError(error);
          })
        );

      }
      
      obtenerVideojuegos():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/mostrarvideojuegos`);
      }

      cambiarPassword(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/change-password`, data)
          .pipe(
            catchError(error => {
              console.error('Error al cambiar la contraseña:', error);
              return throwError(error);
            })
          );

        }
}
