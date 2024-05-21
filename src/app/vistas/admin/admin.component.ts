import { Component, OnInit} from '@angular/core';
import { DataService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  datoBuscarEliminar: string = '';
  accion: 'buscar' | 'eliminar' = 'buscar';

  constructor(private dataService: DataService){}

  ngOnInit(): void{
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void{
    this.dataService.obtenerUsuarios().subscribe(
      (response)=>{
        console.log('Usuarios obtenidos');
        this.usuarios = response.usuarios;
      },
      (error)=>{
        console.error("Error al obtener usuarios",error);
      }
    );
  }

  realizarAccion(): void {
    if (this.datoBuscarEliminar.trim() !== '') {
      if (this.accion === 'buscar') {
        this.buscarUsuarios();
      } else if (this.accion === 'eliminar') {
        this.eliminarUsuarios();
      }
    } else {
      this.obtenerUsuarios();
    }
  }

  buscarUsuarios(): void {
    this.dataService.buscarUsuario(this.datoBuscarEliminar).subscribe(
      (response) => {
        console.log('Usuarios encontrados:', response);
        this.usuarios = response.usuarios;
      },
      (error) => {
        console.error("Error al buscar usuarios", error);
      }
    );
  }

  eliminarUsuarios(): void {
    this.dataService.eliminarUsuario(this.datoBuscarEliminar).subscribe(
      (response) => {
        console.log('Usuarios eliminados:', response);
        // Actualizar la lista de usuarios después de la eliminación
        this.obtenerUsuarios();
      },
      (error) => {
        console.error("Error al eliminar usuarios", error);
      }
    );
  }
}
