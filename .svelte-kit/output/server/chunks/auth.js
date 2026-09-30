import { C as writable } from "./server.js";
import "./index-server.js";
//#region src/lib/stores/auth.js
var ROLES = {
	ADMINISTRADOR: "administrador",
	ESTUDIANTE: "estudiante",
	TUTOR: "tutor",
	EMPRESA: "empresa"
};
var initialRol = typeof window !== "undefined" && localStorage.getItem("rol_simulado") || ROLES.ESTUDIANTE;
var user = writable({
	id: 1,
	nombre: "Usuario",
	rol: initialRol
});
//#endregion
export { user as n, ROLES as t };
