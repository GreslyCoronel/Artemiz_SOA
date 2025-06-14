import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosAuthService } from '../services/usuarios-auth.service';

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
  fechaSeleccionada: string | null = null;
  ordenCampo: 'nombre' | 'correo' = 'nombre';
  ordenAscendente: boolean = true;

  constructor(private usuarioService: UsuariosService, private usuariosAuthService : UsuariosAuthService) {}

  ngOnInit() {
    this.usuariosAuthService.getTodosLosUsuariosConHistorial().subscribe(data => {
      this.usuarios = data;
      this.usuariosFiltrados = [...data];
    });
  }

  ordenarPor(campo: 'nombre' | 'correo') {
    if(this.ordenCampo === campo){
      this.ordenAscendente = !this.ordenAscendente;
    }else{
      this.ordenCampo = campo;
      this.ordenAscendente = true;
    }
  }

 filtrar() {
  const texto = (this.busquedaTexto || '').trim().toLowerCase();
  const fechaSeleccionada = this.fechaSeleccionada;

  this.usuariosFiltrados = this.usuarios.filter(usuario => {
    const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`.toLowerCase();
    const correo = (usuario.correo || '').toLowerCase();

    const coincideTexto =
      texto === '' || nombreCompleto.includes(texto) || correo.includes(texto);

    const coincideFecha =
      !fechaSeleccionada ||
      (usuario.registros || []).some((r: any) => {
        const fechaIngreso = new Date(r.fechaIngreso.toDate());
        const fechaFormateada = fechaIngreso.toISOString().split('T')[0]; // yyyy-MM-dd
        return fechaFormateada === fechaSeleccionada;
      });

    return coincideTexto && coincideFecha;
  });
}



  resetFiltros() {
    this.busquedaTexto = '';
    this.fechaSeleccionada = '';
    this.usuariosFiltrados = [...this.usuarios];
  }

 
}
