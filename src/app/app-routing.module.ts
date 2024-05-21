import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideojuegosComponent} from './vistas/videojuegos/videojuegos.component';
import { RegistroComponent} from './vistas/registro/registro.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { LoginComponent } from './vistas/login/login.component';
import { CarritocompraComponent } from './vistas/carritocompra/carritocompra.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { AdminvideojuegoComponent } from './vistas/adminvideojuego/adminvideojuego.component';
import { EditarpasswordComponent } from './vistas/editarpassword/editarpassword.component';


const routes: Routes = [
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  {path:'inicio', component:InicioComponent},
  {path:'registro', component:RegistroComponent},
  {path:'videojuegos', component:VideojuegosComponent},
  {path:'carrito', component:CarritocompraComponent},
  {path:'login', component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:"adminvideojuego",component:AdminvideojuegoComponent},
  {path:"editarpassword",component:EditarpasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
