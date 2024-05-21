import { Component,OnInit} from '@angular/core';
import { DataService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css'
})
export class VideojuegosComponent  {
  imagenes: { id: number; imagen: string; }[] = [];
  videojuegos:any[]=[]


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.obtenerVideojuegos(); // Llama a la función para obtener los videojuegos al inicializar el componente
    this.obtenerImagenes(); // Llama a la función para obtener las imágenes al inicializar el componente
  }

  obtenerVideojuegos(): void {
    this.dataService.obtenerVideojuegos().subscribe( 
      response => {
        this.videojuegos = response; // Almacena los videojuegos obtenidos en la variable del componente
      },
      error => {
        console.error('Error al obtener videojuegos:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }

  obtenerImagenes(): void {
    this.dataService.sacarImagenes().subscribe(
      response => {
        this.imagenes = response.imagenes; // Almacena las imágenes obtenidas en la variable del componente
      },
      error => {
        console.error('Error al obtener imágenes:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }
}