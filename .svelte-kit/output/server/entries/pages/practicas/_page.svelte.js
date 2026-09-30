import { b as escape_html, i as ensure_array_like, o as store_get, r as derived, s as unsubscribe_stores, y as attr } from "../../../chunks/server.js";
import { n as user, t as ROLES } from "../../../chunks/auth.js";
//#region src/routes/practicas/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let busqueda = "";
		let filtroEstado = "todos";
		let practicas = [{
			id: 1,
			estudiante: "Daniel Peñaranda",
			empresa: "Tech Solutions S.A.S",
			tutor: "Rafael Arzuza",
			periodo: "2026-II",
			estado: "En Curso"
		}, {
			id: 2,
			estudiante: "Carlos Ruiz",
			empresa: "Constructora del Caribe",
			tutor: "Rafael Arzuza",
			periodo: "2026-II",
			estado: "Evaluada"
		}];
		let practicasFiltradas = derived(() => practicas.filter((p) => {
			return (p.estudiante.toLowerCase().includes(busqueda.toLowerCase()) || p.empresa.toLowerCase().includes(busqueda.toLowerCase())) && true;
		}));
		$$renderer.push(`<div class="bg-modulo-practicas flex-grow-1 py-4"><div class="container"><div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"><div><h2 class="fw-bold mb-1"><i class="bi bi-journal-check text-primary me-2"></i>Gestión de Prácticas Profesionales</h2> <p class="text-muted small mb-0">Control y seguimiento de las asignaciones vigentes entre estudiantes, tutores y empresas aliadas.</p></div> `);
		if (store_get($$store_subs ??= {}, "$user", user).rol === ROLES.ADMINISTRADOR) $$renderer.push(`<!--[0--><button class="btn btn-primary text-white fw-bold shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalPractica"><i class="bi bi-journal-plus me-1"></i> Asignar Práctica</button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="row g-3 mb-4"><div class="col-md-4"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3"><i class="bi bi-journal-bookmark-fill fs-4"></i></div> <div><span class="text-muted small d-block">Prácticas Activas</span> <h4 class="fw-bold mb-0">${escape_html(practicas.filter((p) => p.estado === "En Curso").length)} En Curso</h4></div></div></div></div> <div class="col-md-4"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3"><i class="bi bi-patch-check-fill fs-4"></i></div> <div><span class="text-muted small d-block">Evaluadas</span> <h4 class="fw-bold mb-0">${escape_html(practicas.filter((p) => p.estado === "Evaluada").length)} Finalizadas</h4></div></div></div></div> <div class="col-md-4"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3"><i class="bi bi-clock-history fs-4"></i></div> <div><span class="text-muted small d-block">Periodo Académico</span> <h4 class="fw-bold mb-0">2026 - II</h4></div></div></div></div></div> <div class="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white"><div class="row g-3 align-items-center"><div class="col-md-8"><div class="input-group"><span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span> <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por nombre de estudiante o empresa..."${attr("value", busqueda)}/></div></div> <div class="col-md-4">`);
		$$renderer.select({
			class: "form-select bg-light",
			value: filtroEstado
		}, ($$renderer) => {
			$$renderer.option({ value: "todos" }, ($$renderer) => {
				$$renderer.push(`Filtrar por estado (Todos)`);
			});
			$$renderer.option({ value: "en curso" }, ($$renderer) => {
				$$renderer.push(`En Curso`);
			});
			$$renderer.option({ value: "evaluada" }, ($$renderer) => {
				$$renderer.push(`Evaluada`);
			});
		});
		$$renderer.push(`</div></div></div> <div class="card shadow-sm border-0 rounded-4 overflow-hidden"><div class="card-body p-0"><div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-dark py-3"><tr><th class="ps-4">Estudiante</th><th>Empresa Aliada</th><th>Tutor Asignado</th><th>Periodo</th><th>Estado</th><th class="text-end pe-4">Acciones</th></tr></thead><tbody>`);
		if (practicasFiltradas().length === 0) $$renderer.push(`<!--[0--><tr><td colspan="6" class="text-center py-4 text-muted">No se encontraron prácticas registradas con los criterios de búsqueda.</td></tr>`);
		else {
			$$renderer.push(`<!--[-1--><!--[-->`);
			const each_array = ensure_array_like(practicasFiltradas());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<tr><td class="ps-4"><div class="d-flex align-items-center"><div class="bg-primary bg-opacity-25 text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.85rem;"><i class="bi bi-person"></i></div> <span class="fw-bold text-dark">${escape_html(p.estudiante)}</span></div></td><td class="text-muted"><i class="bi bi-building me-1"></i>${escape_html(p.empresa)}</td><td class="text-muted"><i class="bi bi-person-badge me-1"></i>${escape_html(p.tutor)}</td><td><span class="badge bg-light text-dark border px-2 py-1">${escape_html(p.periodo)}</span></td><td>`);
				if (p.estado === "En Curso") $$renderer.push(`<!--[0--><span class="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill">En Curso</span>`);
				else $$renderer.push(`<!--[-1--><span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">Evaluada</span>`);
				$$renderer.push(`<!--]--></td><td class="text-end pe-4">`);
				if (store_get($$store_subs ??= {}, "$user", user).rol === ROLES.ADMINISTRADOR) $$renderer.push(`<!--[0--><button class="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#modalPractica" aria-label="Editar práctica"><i class="bi bi-pencil-fill me-1"></i> Editar</button> <button class="btn btn-sm btn-danger" aria-label="Eliminar práctica"><i class="bi bi-trash-fill me-1"></i> Eliminar</button>`);
				else $$renderer.push(`<!--[-1--><button class="btn btn-sm btn-outline-primary px-3"><i class="bi bi-eye me-1"></i> Ver Detalle</button>`);
				$$renderer.push(`<!--]--></td></tr>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div></div></div></div> <div class="modal fade" id="modalPractica" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content border-0 rounded-4 overflow-hidden shadow"><div class="modal-header bg-primary text-white px-4 py-3"><h5 class="modal-title fw-bold"><i class="bi bi-journal-plus me-2"></i>Asignación de Práctica Profesional</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar modal"></button></div> <div class="modal-body p-4"><form class="row g-3"><div class="col-12"><label for="est_p" class="form-label fw-bold small">Estudiante</label> <input type="text" id="est_p" class="form-control bg-light" placeholder="Nombre del estudiante"/></div> <div class="col-md-6"><label for="emp_p" class="form-label fw-bold small">Empresa</label> <input type="text" id="emp_p" class="form-control bg-light" placeholder="Empresa aliada"/></div> <div class="col-md-6"><label for="tut_p" class="form-label fw-bold small">Tutor Asignado</label> <input type="text" id="tut_p" class="form-control bg-light" placeholder="Nombre del tutor"/></div></form></div> <div class="modal-footer bg-light px-4 py-3"><button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button> <button type="button" class="btn btn-primary text-white px-4" data-bs-dismiss="modal">Guardar Asignación</button></div></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
