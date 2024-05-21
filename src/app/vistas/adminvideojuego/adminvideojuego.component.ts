import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adminvideojuego',
  templateUrl: './adminvideojuego.component.html',
  styleUrls: ['./adminvideojuego.component.css']
})
export class AdminvideojuegoComponent {
  titulo: FormControl = new FormControl("", [Validators.required]);
  descripcion: FormControl = new FormControl("", [Validators.required]);
  precio: FormControl = new FormControl("", [Validators.required, Validators.min(0)]);
  genero: FormControl = new FormControl("", [Validators.required]);
  plataforma: FormControl = new FormControl("", [Validators.required]);
  successMessage: string = "";
  loading: boolean = false;
  imagenFile: File | undefined; // Variable para almacenar la imagen seleccionada
  errorMessage: string = ""; // Variable para almacenar el mensaje de error al agregar videojuego
  errorImagen: string = ""; // Variable para almacenar el mensaje de error al subir imagen
  successImagen: string = ""; // Variable para almacenar el mensaje de éxito al subir imagen
  missingImageError: boolean = false; // Variable para mostrar el mensaje de error si no se selecciona una imagen
  missingDataError: boolean = false; // Variable para mostrar el mensaje de error si faltan datos en el formulario

  constructor(private dataService: DataService, private router: Router, private tituloPagina: Title) {
    tituloPagina.setTitle("Administrar Videojuego");
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.imagenFile = files[0];
    }
  }

  agregarImagen(): void {
    if (this.imagenFile) {
      const formData = new FormData();
      formData.append('imagen', this.imagenFile);

      this.dataService.subirImagen(formData).subscribe(response => {
        // Manejar la respuesta si es necesario
        console.log('Imagen subida satisfactoriamente:', response);
        this.errorImagen = ""; // Restablecer el mensaje de error
        this.successImagen = "Imagen subida satisfactoriamente"; // Mostrar el mensaje de éxito
      }, error => {
        console.error('Error al subir la imagen:', error);
      });
    } else {
      this.errorImagen = "Por favor, seleccione una imagen.";
    }
  }

  agregarVideojuego(): void {
    this.missingImageError = false; // Restablecer la bandera de error de imagen
    this.successImagen = ""; // Restablecer el mensaje de éxito de imagen

    if (this.titulo.valid && this.descripcion.valid && this.precio.valid && this.genero.valid && this.plataforma.valid) {
      if (!this.imagenFile) {
        this.missingImageError = true;
        return;
      }

      this.loading = true; // Mostrar spinner

      const videojuegoData = {
        titulo: this.titulo.value,
        descripcion: this.descripcion.value,
        precio: this.precio.value,
        genero: this.genero.value,
        plataforma: this.plataforma.value
      };

      this.dataService.agregarVideojuego(videojuegoData).subscribe(response => {
        this.loading = false; // Ocultar spinner
        this.successMessage = 'Videojuego añadido satisfactoriamente';
      }, error => {
        this.loading = false; // Ocultar spinner
        console.error('Error al agregar el videojuego:', error.error);
      });
    } else {
      this.missingDataError = true;
    }
  }
}
