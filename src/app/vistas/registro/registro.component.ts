import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]);
  correo: FormControl = new FormControl('', [Validators.email, Validators.required]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]*$/)]);
  repetirPassword: FormControl = new FormControl('', [Validators.required]);
  successMessage: string = '';
  loading: boolean = false;

  constructor(private registroService: DataService, private router: Router, private titulo: Title) {
    titulo.setTitle('RegistroUsuarios');
  }

  EnviarDatos() {
    if (this.nombre.valid && this.correo.valid && this.password.valid && this.repetirPassword.valid && this.password.value === this.repetirPassword.value) {
      this.loading = true; // Show spinner
      const usuario = {
        nombre: this.nombre.value,
        correo: this.correo.value,
        password: this.password.value,
        fechaRegistro: new Date()  // Añadir fecha de registro si deseas
      };

      this.registroService.registrarUsuario(usuario).subscribe(response => {
        this.loading = false; // Hide spinner
        this.successMessage = 'Usuario añadido satisfactoriamente';
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login page after 2 seconds
        }, 2000);
      }, error => {
        this.loading = false; // Hide spinner
        console.error('Error al enviar los datos:', error);
      });
    } else {
      console.error('Error en los datos del formulario. Verifica los campos.');
    }
  }
}

