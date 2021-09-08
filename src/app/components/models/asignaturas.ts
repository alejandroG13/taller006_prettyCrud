export class Asignatura {
  public id_asig: number;
  public nombre: string;
  public profesor: string;
  public foto_prof: string;
  public fotoBase64: string;


  constructor (id: number, nom: string, prof: string, foto: string, foto64: string){
    this.id_asig = id;
    this.nombre = nom;
    this.profesor = prof;
    this.foto_prof = foto;
    this.fotoBase64 = foto64;
  }
}
