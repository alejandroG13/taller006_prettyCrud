import { ARREGLO_ASIGNATURAS } from './../mocks/asignatura-mock';
import { Asignatura } from './../models/asignaturas';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public asignaturaSeleccionada: Asignatura;
  public asignaturaArreglo: Asignatura[];
  public tmpBase64: any;
  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalTexto: string;
  public modalContenido: string;

  constructor(
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.asignaturaSeleccionada = new Asignatura(0, '', '', '', '');
    this.asignaturaArreglo = ARREGLO_ASIGNATURAS;
    this.modalRef = modalService.show('');
    this.modalTitulo = '';
    this.modalTexto = '';
    this.modalContenido = '';
  }

  ngOnInit(): void {}

  public seleccionar(tmpAsig: Asignatura): void {
    this.asignaturaSeleccionada = tmpAsig;
  }

  public cancelar(): void {
    this.asignaturaSeleccionada = new Asignatura(0, '', '', '', '');
  }

  public grabarAsignatura(): boolean {
    if (
      this.asignaturaSeleccionada.nombre == '' ||
      this.asignaturaSeleccionada.profesor == ''
    ) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'No se pueden crear <br/> registros vacios',
        'ADVERTENCIA',
        parametros
      );
      return false;
    } else {
      this.asignaturaSeleccionada.id_asig = this.asignaturaArreglo.length + 1;
      this.asignaturaArreglo.push(this.asignaturaSeleccionada);
      return true;
    }
  }

  public procesarAsignatura(): void {
    if (this.asignaturaSeleccionada.id_asig === 0) {
      this.grabarAsignatura();
    }
    this.asignaturaSeleccionada = new Asignatura(0, '', '', '', '');
  }

  public eliminarAsignatura(objAsignatura: Asignatura): void {
    this.asignaturaArreglo = this.asignaturaArreglo.filter(
      (elemento) => elemento != objAsignatura
    );
    this.asignaturaSeleccionada = new Asignatura(0, '', '', '', '');
  }

  public btnEliminar(): void {
    this.eliminarAsignatura(this.asignaturaSeleccionada);
    this.modalRef.hide();
  }

  public btnCancelarEliminar(): void {
    this.modalRef.hide();
  }

  public abrirModal(template: TemplateRef<any>, asignTmp: Asignatura): void {
    this.asignaturaSeleccionada = asignTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'ADVERTENCIA';
    this.modalTexto = '¿Realmente quiere eliminar el registro?';
    this.modalContenido = this.asignaturaSeleccionada.nombre;
  }

  public seleccionarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].lenght === 0) {
      return;
    }

    const mimeType = input.target.files[0].type;
    if (mimeType.match(/image\/*/ == null)) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'Solo se pueden <br/> recibir <strong>imagenes</strong>',
        'Avertencia',
        parametros
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;

      this.asignaturaSeleccionada.fotoBase64 = this.tmpBase64;
      this.asignaturaSeleccionada.foto_prof = input.target.files[0].name;
    };
  }
}
