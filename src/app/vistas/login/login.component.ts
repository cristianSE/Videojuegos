import { Component } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import { DataService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
correo: FormControl = new FormControl('',[Validators.required,Validators.email]);
password:FormControl = new FormControl('',[Validators.required])
repetirPassword: FormControl = new FormControl('', [Validators.required]);
loading:boolean= false;
errorMessage:string='';

constructor(private dataService: DataService,private router: Router,private titulo:Title){
  titulo.setTitle('LoginUsuario')
}

ComprobarDatos() {
  if (this.correo.valid && this.password.valid && this.repetirPassword.valid) {
    if (this.password.value === this.repetirPassword.value) {
      this.loading = true;
      
      const credenciales = {
        correo: this.correo.value,
        password: this.password.value
      };
      
      this.dataService.loginUsuario(credenciales).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.loading = false; // Detener el indicador de carga
          if (response && response.mensaje === 'Inicio de sesión exitoso') {
            if (response.tipo === 'admin') {
              // Redirigir al usuario a la página de administrador si el inicio de sesión fue exitoso como administrador
              this.router.navigate(['/admin']);
            } else {
              // Redirigir al usuario a la página de videojuegos si el inicio de sesión fue exitoso como usuario normal
              this.router.navigate(['/videojuegos']);
            }
          } else {
            // Mostrar un mensaje de error si las credenciales son inválidas
            this.errorMessage = "Correo o contraseña no correctas";
          }
        },
        (error) => {
          console.error("Error en el inicio de sesión", error);
          this.loading = false; // Detener el indicador de carga
          this.errorMessage = "Se produjo un error al iniciar sesión";
          this.router.navigate(['/login']); // Redirigir al usuario de vuelta a la página de inicio de sesión
        }
      );
    } else {
      this.errorMessage = "Las contraseñas no coinciden";
    }
  } else {
    this.errorMessage = "Por favor, complete los campos correctamente.";
  }
}


}
