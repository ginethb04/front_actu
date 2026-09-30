import { b as escape_html, i as ensure_array_like, o as store_get, r as derived, s as unsubscribe_stores, y as attr } from "../../../chunks/server.js";
import { n as user, t as ROLES } from "../../../chunks/auth.js";
//#region src/routes/evaluaciones/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let busqueda = "";
		let filtroTipo = "todos";
		let evaluaciones = [{
			id: 1,
			estudiante: "Daniel Peñaranda",
			evaluador: "Rafael Arzuza (Tutor)",
			tipo: "Parcial",
			puntaje: "4.8 / 5.0",
			fecha: "2026-09-10",
			estado: "Completada"
		}, {
			id: 2,
			estudiante: "Daniel Peñaranda",
			evaluador: "Tech Solutions S.A.S (Empresa)",
			tipo: "Final",
			puntaje: "Pendiente",
			fecha: "2026-10-15",
			estado: "Pendiente"
		}];
		let evaluacionesFiltradas = derived(() => evaluaciones.filter((e) => {
			return (e.estudiante.toLowerCase().includes(busqueda.toLowerCase()) || e.evaluador.toLowerCase().includes(busqueda.toLowerCase())) && true;
		}));
		$$renderer.push(`<div class="bg-modulo-evaluaciones flex-grow-1 py-4"><div class="container"><div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"><div><h2 class="fw-bold mb-1"><i class="bi bi-award text-warning me-2"></i>Evaluaciones de Desempeño</h2> <p class="text-muted small mb-0">Gestión de calificaciones parciales y finales emitidas por tutores y empresas supervisoras.</p></div> `);
		if (store_get($$store_subs ??= {}, "$user", user).rol === ROLES.TUTOR || store_get($$store_subs ??= {}, "$user", user).rol === ROLES.ADMINISTRADOR) $$renderer.push(`<!--[0--><button class="btn btn-warning text-dark fw-bold shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalEvaluacion"><i class="bi bi-plus-circle me-1"></i> Emitir Evaluación</button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="row g-3 mb-4"><div class="col-md-4"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3"><i class="bi bi-award-fill fs-4"></i></div> <div><span class="text-muted small d-block">Promedio General</span> <h4 class="fw-bold mb-0">4.8 / 5.0 Excelente</h4></div></div></div></div> <div class="col-md-4"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3"><i class="bi bi-check-circle-fill fs-4"></i></div> <div><span class="text-muted small d-block">Evaluaciones Listas</span> <h4 class="fw-bold mb-0">1 Completada</h4></div></div></div></div> <div class="col-md-4"><div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white"><div class="d-flex align-items-center"><div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3"><i class="bi bi-clock-fill fs-4"></i></div> <div><span class="text-muted small d-block">Por Emitir</span> <h4 class="fw-bold mb-0">1 Pendiente</h4></div></div></div></div></div> <div class="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white"><div class="row g-3 align-items-center"><div class="col-md-8"><div class="input-group"><span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span> <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por estudiante o evaluador..."${attr("value", busqueda)}/></div></div> <div class="col-md-4">`);
		$$renderer.select({
			class: "form-select bg-light",
			value: filtroTipo
		}, ($$renderer) => {
			$$renderer.option({ value: "todos" }, ($$renderer) => {
				$$renderer.push(`Filtrar por tipo (Todos)`);
			});
			$$renderer.option({ value: "parcial" }, ($$renderer) => {
				$$renderer.push(`Parcial`);
			});
			$$renderer.option({ value: "final" }, ($$renderer) => {
				$$renderer.push(`Final`);
			});
		});
		$$renderer.push(`</div></div></div> <div class="card shadow-sm border-0 rounded-4 overflow-hidden"><div class="card-body p-0"><div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead class="table-dark py-3"><tr><th class="ps-4">Estudiante</th><th>Evaluador / Fuente</th><th>Tipo</th><th>Puntaje Obtenido</th><th>Fecha Limite / Registro</th><th>Estado</th><th class="text-end pe-4">Acciones</th></tr></thead><tbody>`);
		if (evaluacionesFiltradas().length === 0) $$renderer.push(`<!--[0--><tr><td colspan="7" class="text-center py-4 text-muted">No se encontraron evaluaciones con los criterios de búsqueda.</td></tr>`);
		else {
			$$renderer.push(`<!--[-1--><!--[-->`);
			const each_array = ensure_array_like(evaluacionesFiltradas());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let e = each_array[$$index];
				$$renderer.push(`<tr><td class="ps-4"><div class="d-flex align-items-center"><div class="bg-warning bg-opacity-25 text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.85rem;"><i class="bi bi-person"></i></div> <span class="fw-bold text-dark">${escape_html(e.estudiante)}</span></div></td><td class="text-muted">${escape_html(e.evaluador)}</td><td><span class="badge bg-light text-dark border px-2 py-1">${escape_html(e.tipo)}</span></td><td class="fw-bold text-success">${escape_html(e.puntaje)}</td><td class="text-muted small"><i class="bi bi-calendar-event me-1"></i>${escape_html(e.fecha)}</td><td>`);
				if (e.estado === "Completada") $$renderer.push(`<!--[0--><span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">Completada</span>`);
				else $$renderer.push(`<!--[-1--><span class="badge bg-warning-subtle text-warning text-dark px-3 py-1 rounded-pill">Pendiente</span>`);
				$$renderer.push(`<!--]--></td><td class="text-end pe-4"><button class="btn btn-sm btn-outline-primary px-3"><i class="bi bi-eye me-1"></i> Ver Rúbrica</button></td></tr>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div></div></div></div> <div class="modal fade" id="modalEvaluacion" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content border-0 rounded-4 overflow-hidden shadow"><div class="modal-header bg-warning text-dark px-4 py-3"><h5 class="modal-title fw-bold"><i class="bi bi-award-fill me-2"></i>Emitir Calificación de Desempeño</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar modal"></button></div> <div class="modal-body p-4"><form class="row g-3"><div class="col-12"><label for="est_ev" class="form-label fw-bold small">Estudiante Evaluado</label> <input type="text" id="est_ev" class="form-control bg-light" placeholder="Nombre completo del estudiante"/></div> <div class="col-md-6"><label for="tipo_ev" class="form-label fw-bold small">Tipo de Evaluación</label> <select id="tipo_ev" class="form-select bg-light">`);
		$$renderer.option({ value: "parcial" }, ($$renderer) => {
			$$renderer.push(`Parcial`);
		});
		$$renderer.option({ value: "final" }, ($$renderer) => {
			$$renderer.push(`Final`);
		});
		$$renderer.push(`</select></div> <div class="col-md-6"><label for="nota_ev" class="form-label fw-bold small">Calificación (0.0 - 5.0)</label> <input type="number" id="nota_ev" class="form-control bg-light" placeholder="4.8" step="0.1" min="0" max="5"/></div> <div class="col-12"><label for="com_ev" class="form-label fw-bold small">Observaciones y Comentarios</label> <textarea id="com_ev" class="form-control bg-light" rows="3" placeholder="Retroalimentación sobre el rendimiento del estudiante..."></textarea></div></form></div> <div class="modal-footer bg-light px-4 py-3"><button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button> <button type="button" class="btn btn-warning text-dark fw-bold px-4" data-bs-dismiss="modal">Guardar Calificación</button></div></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
