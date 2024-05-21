import { Component } from '@angular/core';
import { FormControl,Validators,FormGroup} from '@angular/forms';
import { DataService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editarpassword',
  templateUrl: './editarpassword.component.html',
  styleUrl: './editarpassword.component.css'
})
export class EditarpasswordComponent {
  correo: FormControl=new FormControl("",[Validators.required,Validators.email]);
  password:FormControl=new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]*$/)]);
  repetirpassword: FormControl = new FormControl('', [Validators.required]);
  loading: boolean=false;
  successMessage:String="";
  errorMessage:String="";

  constructor(private dataService: DataService, private router: Router,private titulo: Title){
    this.titulo.setTitle("EditarContraseña");
    }
    cambiopassword() {
      if (this.password.value !== this.repetirpassword.value) {
        this.errorMessage = "Las contraseñas no coinciden";
        this.successMessage = '';
        return;
      }
  
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      const formData = {
        email: this.correo.value,
        password: this.password.value
      };
  
      this.dataService.cambiarPassword(formData).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Contraseña actualizada correctamente';
          this.errorMessage = '';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Error al actualizar la contraseña';
          this.successMessage = '';
        }
      });
    }
  }


