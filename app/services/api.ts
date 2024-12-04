import { Student, Subject, Grade, Enrollment } from '../types';
import { API_URL, getHeaders } from './config';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Error en la petición');
  }
  return response.json();
};

// Servicios para Estudiantes
export const studentServices = {
  getAll: async (): Promise<Student[]> => {
    try {
      const response = await fetch(`${API_URL}/alumnos`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los alumnos');
      }

      const data = await response.json();
      console.log('Datos de alumnos recibidos:', data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error en getAll students:', error);
      throw error;
    }
  },

  create: async (student: Student): Promise<Student> => {
    const formData = new FormData();
    Object.entries(student).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_URL}/alumnos`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  update: async (id: string, student: Student): Promise<Student> => {
    const formData = new FormData();
    Object.entries(student).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_URL}/alumnos/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/alumnos/${id}`, {
      method: 'DELETE',
    });
  },
};

// Servicios para Materias
export const subjectServices = {
  getAll: async (): Promise<Subject[]> => {
    const response = await fetch(`${API_URL}/materias`);
    return response.json();
  },

  create: async (subject: Subject): Promise<Subject> => {
    const formData = new FormData();
    Object.entries(subject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_URL}/materias`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  update: async (id: string, subject: Subject): Promise<Subject> => {
    const formData = new FormData();
    Object.entries(subject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_URL}/materias/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/materias/${id}`, {
      method: 'DELETE',
    });
  },
};

// Servicios para Calificaciones
export const gradeServices = {
  getAll: async (): Promise<Grade[]> => {
    const response = await fetch(`${API_URL}/calificaciones`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error al obtener las calificaciones');
    }

    const data = await response.json();
    console.log('Calificaciones recibidas:', data);
    return Array.isArray(data) ? data : [];
  },

  create: async (grade: Grade): Promise<Grade> => {
    const formData = new FormData();
    formData.append('alumno_id', grade.alumno_id);
    formData.append('materia_id', grade.materia_id);
    formData.append('calificacion', grade.calificacion.toString());

    console.log('FormData enviado:', {
      alumno_id: grade.alumno_id,
      materia_id: grade.materia_id,
      calificacion: grade.calificacion
    });

    const response = await fetch(`${API_URL}/calificaciones`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(errorData.detail || 'Error al crear la calificación');
    }

    const result = await response.json();
    console.log('Respuesta del servidor:', result);
    return result;
  },

  update: async (id: string, grade: Grade): Promise<Grade> => {
    const formData = new FormData();
    Object.entries(grade).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const response = await fetch(`${API_URL}/grades/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return handleResponse(response);
  },
};

// Servicios para Inscripciones
export const enrollmentServices = {
  getAll: async (): Promise<Enrollment[]> => {
    const response = await fetch(`${API_URL}/inscripciones`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },

  create: async (enrollment: Enrollment): Promise<Enrollment> => {
    const response = await fetch(
      `${API_URL}/inscripcion/${enrollment.alumno_id}/${enrollment.materia_id}`, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error al crear la inscripción');
    }

    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/inscripcion/${id}`, {
      method: 'DELETE',
    });
  },
}; 