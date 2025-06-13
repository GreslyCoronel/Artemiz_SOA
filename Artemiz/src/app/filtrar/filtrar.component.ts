import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtrar',
  imports: [FormsModule,CommonModule],
  templateUrl: './filtrar.component.html',
  styleUrl: './filtrar.component.css'
})
export class FiltrarComponent {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  busquedaTexto: string = '';
  fechaSeleccionada: string = '';
  ordenCampo: string = '';
  ordenAscendente: boolean = true;

  constructor(private usuarioService: UsuariosService) {}

  //ngOnInit() {
    //this.usuarioService.getUsuarios().subscribe(data => {
      //this.usuarios = data;
      //this.usuariosFiltrados = [...data];
    //});
 // }

  filtrar() {
    this.usuariosFiltrados = this.usuarios.filter(u => {
      const coincideTexto = u.nombre.toLowerCase().includes(this.busquedaTexto.toLowerCase()) ||
                            u.email?.toLowerCase().includes(this.busquedaTexto.toLowerCase());

      const coincideFecha = !this.fechaSeleccionada || 
        new Date(u.fechaIngreso).toDateString() === new Date(this.fechaSeleccionada).toDateString();

      return coincideTexto && coincideFecha;
    });
  }

  reset() {
    this.busquedaTexto = '';
    this.fechaSeleccionada = '';
    this.usuariosFiltrados = [...this.usuarios];
  }

  ordenarPor(campo: string) {
    this.ordenAscendente = this.ordenCampo === campo ? !this.ordenAscendente : true;
    this.ordenCampo = campo;

    this.usuariosFiltrados.sort((a, b) => {
      const aVal = a[campo];
      const bVal = b[campo];
      return this.ordenAscendente ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }
}
