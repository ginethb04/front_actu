import { b as escape_html, i as ensure_array_like, o as store_get, r as derived, s as unsubscribe_stores, y as attr } from "../../../chunks/server.js";
import { n as user, t as ROLES } from "../../../chunks/auth.js";
//#region src/routes/usuarios/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let busqueda = "";
		let filtroRol = "todos";
		let usuarios = [
			{
				nombre: "Daniel Peñaranda",
				correo: "daniel@universidad.edu.co",
				rol: "estudiante",
				estado: "Activo"
			},
			{
				nombre: "Ana María Gómez",
				correo: "ana.gomez@universidad.edu.co",
				rol: "tutor",
				estado: "Activo"
			},
			{
				nombre: "Carlos Vives Ltda.",
				correo: "contacto@vives.com",
				rol: "empresa",
				estado: "Activo"
			},
			{
				nombre: "Sofía Martínez",
				correo: "sofia.martinez@universidad.edu.co",
				rol: "administrador",
				estado: "Activo"
			}
		];
		let usuariosFiltrados = derived(() => usuarios.filter((u) => {
			return (u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || u.correo.toLowerCase().includes(busqueda.toLowerCase())) && true;
		}));
		$$renderer.push(`<div class="bg-modulo-usuarios flex-grow-1 py-4"><div class="container">`);
		if (store_get($$store_subs ??= {}, "$user", user).rol !== ROLES.ADMINISTRADOR) $$renderer.push(`<!--[0--><div class="alert alert-danger shadow-sm text-center py-5 my-4" role="alert"><i class="bi bi-shield-lock-fill display-1 text-danger d-block mb-3"></i> <h3 class="fw-bold">Acceso Restringido</h3> <p class="mb-0">El módulo de <strong>Gestión de Usuarios</strong> es exclusivo para el rol de <strong>Administrador</strong>.</p> <small class="text-muted">Utiliza el selector del menú superior para cambiar al rol de Administrador.</small></div>`);
		else {
			$$renderer.push(`<!--[-1--><div class="d-flex justify-content-between align-items-center mb-4"><div><h2 class="fw-bold mb-1"><i class="bi bi-people text-info me-2"></i>Gestión de Usuarios y Roles</h2> <p class="text-muted small mb-0">Administra las cuentas, accesos y permisos globales de la plataforma institucional.</p></div> <button class="btn btn-info text-white shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalUsuario"><i class="bi bi-person-plus me-1"></i> Crear Usuario</button></div> <div class="row g-3 mb-4"><div class="col-md-3"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-info bg-opacity-10 p-3 rounded-3 text-info me-3"><i class="bi bi-people-fill fs-4"></i></div> <div><span class="text-muted small d-block">Total Usuarios</span> <h4 class="fw-bold mb-0">${escape_html(usuarios.length)}</h4></div></div></div></div> <div class="col-md-3"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3"><i class="bi bi-mortarboard-fill fs-4"></i></div> <div><span class="text-muted small d-block">Estudiantes</span> <h4 class="fw-bold mb-0">${escape_html(usuarios.filter((u) => u.rol === "estudiante").length)}</h4></div></div></div></div> <div class="col-md-3"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3"><i class="bi bi-person-badge-fill fs-4"></i></div> <div><span class="text-muted small d-block">Tutores</span> <h4 class="fw-bold mb-0">${escape_html(usuarios.filter((u) => u.rol === "tutor").length)}</h4></div></div></div></div> <div class="col-md-3"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3"><i class="bi bi-building-fill fs-4"></i></div> <div><span class="text-muted small d-block">Empresas / Admins</span> <h4 class="fw-bold mb-0">${escape_html(usuarios.filter((u) => u.rol === "empresa" || u.rol === "administrador").length)}</h4></div></div></div></div></div> <div class="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white"><div class="row g-3 align-items-center"><div class="col-md-8"><div class="input-group"><span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span> <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por nombre o correo electrónico..."${attr("value", busqueda)}/></div></div> <div class="col-md-4">`);
			$$renderer.select({
				class: "form-select bg-light",
				value: filtroRol
			}, ($$renderer) => {
				$$renderer.option({ value: "todos" }, ($$renderer) => {
					$$renderer.push(`Filtrar por rol (Todos)`);
				});
				$$renderer.option({ value: "estudiante" }, ($$renderer) => {
					$$renderer.push(`Estudiante`);
				});
				$$renderer.option({ value: "tutor" }, ($$renderer) => {
					$$renderer.push(`Tutor`);
				});
				$$renderer.option({ value: "empresa" }, ($$renderer) => {
					$$renderer.push(`Empresa`);
				});
				$$renderer.option({ value: "administrador" }, ($$renderer) => {
					$$renderer.push(`Administrador`);
				});
			});
			$$renderer.push(`</div></div></div> <div class="card shadow-sm border-0 rounded-4 overflow-hidden"><div class="card-body p-0"><div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-dark py-3"><tr><th class="ps-4">Nombre Completo</th><th>Correo Electrónico</th><th>Rol Asignado</th><th>Estado</th><th class="text-end pe-4">Acciones</th></tr></thead><tbody>`);
			if (usuariosFiltrados().length === 0) $$renderer.push(`<!--[0--><tr><td colspan="5" class="text-center py-4 text-muted">No se encontraron usuarios que coincidan con la búsqueda.</td></tr>`);
			else {
				$$renderer.push(`<!--[-1--><!--[-->`);
				const each_array = ensure_array_like(usuariosFiltrados());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let u = each_array[$$index];
					$$renderer.push(`<tr><td class="ps-4"><div class="d-flex align-items-center"><div class="bg-secondary bg-opacity-25 text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.9rem;">${escape_html(u.nombre.substring(0, 2).toUpperCase())}</div> <span class="fw-bold text-dark">${escape_html(u.nombre)}</span></div></td><td class="text-muted">${escape_html(u.correo)}</td><td>`);
					if (u.rol === "estudiante") $$renderer.push(`<!--[0--><span class="badge bg-primary px-3 py-2 rounded-pill">Estudiante</span>`);
					else if (u.rol === "tutor") $$renderer.push(`<!--[1--><span class="badge bg-success px-3 py-2 rounded-pill">Tutor</span>`);
					else if (u.rol === "empresa") $$renderer.push(`<!--[2--><span class="badge bg-warning text-dark px-3 py-2 rounded-pill">Empresa</span>`);
					else $$renderer.push(`<!--[-1--><span class="badge bg-dark px-3 py-2 rounded-pill">Administrador</span>`);
					$$renderer.push(`<!--]--></td><td><span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">${escape_html(u.estado)}</span></td><td class="text-end pe-4"><button class="btn btn-sm btn-primary me-1" aria-label="Editar usuario"><i class="bi bi-pencil-fill me-1"></i> Editar</button> <button class="btn btn-sm btn-danger" aria-label="Eliminar usuario"><i class="bi bi-trash-fill me-1"></i> Eliminar</button></td></tr>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></tbody></table></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="modal fade" id="modalUsuario" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content border-0 rounded-4 overflow-hidden shadow"><div class="modal-header bg-info text-white px-4 py-3"><h5 class="modal-title fw-bold"><i class="bi bi-person-plus-fill me-2"></i>Registrar Nuevo Usuario</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar modal"></button></div> <div class="modal-body p-4"><form class="row g-3"><div class="col-12"><label for="nom_u" class="form-label fw-bold small">Nombre Completo</label> <input type="text" id="nom_u" class="form-control bg-light" placeholder="Ej. Juan Pérez"/></div> <div class="col-md-6"><label for="mail_u" class="form-label fw-bold small">Correo Institucional</label> <input type="email" id="mail_u" class="form-control bg-light" placeholder="correo@dominio.com"/></div> <div class="col-md-6"><label for="rol_u" class="form-label fw-bold small">Rol del Sistema</label> <select id="rol_u" class="form-select bg-light">`);
		$$renderer.option({ value: "estudiante" }, ($$renderer) => {
			$$renderer.push(`Estudiante`);
		});
		$$renderer.option({ value: "tutor" }, ($$renderer) => {
			$$renderer.push(`Tutor`);
		});
		$$renderer.option({ value: "empresa" }, ($$renderer) => {
			$$renderer.push(`Empresa`);
		});
		$$renderer.option({ value: "administrador" }, ($$renderer) => {
			$$renderer.push(`Administrador`);
		});
		$$renderer.push(`</select></div></form></div> <div class="modal-footer bg-light px-4 py-3"><button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button> <button type="button" class="btn btn-info text-white px-4" data-bs-dismiss="modal">Guardar Usuario</button></div></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
