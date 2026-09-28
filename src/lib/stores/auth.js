// src/lib/stores/auth.js
import { writable } from 'svelte/store';

export const ROLES = {
  ADMINISTRADOR: 'administrador',
  ESTUDIANTE: 'estudiante',
  TUTOR: 'tutor',
  EMPRESA: 'empresa'
};

// Obtener rol guardado o usar 'estudiante' por defecto
const initialRol = (typeof window !== 'undefined' && localStorage.getItem('rol_simulado')) || ROLES.ESTUDIANTE;

export const user = writable({
  id: 1,
  nombre: 'Usuario',
  rol: initialRol
});

export function cambiarRol(nuevoRol) {
  user.update((u) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rol_simulado', nuevoRol);
    }
    return { ...u, rol: nuevoRol };
  });
}