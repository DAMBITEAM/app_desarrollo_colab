export interface Student {
  id?: string;
  matricula: string;
  nombre: string;
  apellido: string;
  email: string;
}

export interface Subject {
  id?: string;
  codigo: string;
  nombre: string;
  creditos: number;
}

export interface Grade {
  id?: string;
  alumno_id: string;
  materia_id: string;
  calificacion: number;
}

export interface Enrollment {
  id?: string;
  alumno_id: string;
  materia_id: string;
} 