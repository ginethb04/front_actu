import { b as escape_html, i as ensure_array_like, n as attr_style, o as store_get, r as derived, s as unsubscribe_stores, t as attr_class, y as attr } from "../../../chunks/server.js";
import { n as user, t as ROLES } from "../../../chunks/auth.js";
//#region src/routes/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const roleData = {
			[ROLES.ESTUDIANTE]: {
				eyebrow: "Mi proceso académico",
				title: "Tu práctica, bajo control.",
				text: "Consulta tus oportunidades, postulaciones, bitácoras y avances desde un solo lugar.",
				stats: [
					[
						"Postulación",
						"En revisión",
						"bi-send-fill"
					],
					[
						"Avance de práctica",
						"32%",
						"bi-graph-up-arrow"
					],
					[
						"Horas registradas",
						"120 h",
						"bi-clock-history"
					],
					[
						"Bitácoras",
						"3 de 12",
						"bi-journal-text"
					]
				],
				activities: [
					[
						"bi-send",
						"Postulación en revisión",
						"Tu postulación a Software LTDA está siendo revisada."
					],
					[
						"bi-journal-check",
						"Bitácora pendiente",
						"Tienes una bitácora correspondiente a esta semana."
					],
					[
						"bi-chat-left-text",
						"Seguimiento académico",
						"Tu tutor registró una nueva observación."
					]
				],
				progress: [
					["Avance de práctica", 32],
					["Horas requeridas", 31],
					["Bitácoras entregadas", 25]
				],
				quick: [
					[
						"bi-search",
						"Buscar puestos",
						"Explora nuevas oportunidades",
						"/postulaciones"
					],
					[
						"bi-journal-text",
						"Registrar bitácora",
						"Documenta tu semana",
						"/bitacoras"
					],
					[
						"bi-building",
						"Ver empresas",
						"Conoce empresas aliadas",
						"/empresas"
					],
					[
						"bi-award",
						"Mi evaluación",
						"Consulta tu evaluación",
						"/evaluaciones"
					]
				]
			},
			[ROLES.TUTOR]: {
				eyebrow: "Acompañamiento académico",
				title: "Supervisa el avance de tus estudiantes.",
				text: "Revisa prácticas asignadas, valida bitácoras y registra el seguimiento académico.",
				stats: [
					[
						"Estudiantes asignados",
						"8",
						"bi-people-fill"
					],
					[
						"Bitácoras por revisar",
						"3",
						"bi-journal-text"
					],
					[
						"Seguimientos",
						"5",
						"bi-clipboard-check"
					],
					[
						"Evaluaciones pendientes",
						"2",
						"bi-award-fill"
					]
				],
				activities: [
					[
						"bi-journal-text",
						"3 bitácoras requieren revisión",
						"Revisa los registros enviados por tus estudiantes."
					],
					[
						"bi-graph-up",
						"Seguimiento pendiente",
						"Hay estudiantes sin seguimiento registrado este periodo."
					],
					[
						"bi-award",
						"Evaluaciones próximas",
						"Dos procesos están cerca del cierre."
					]
				],
				progress: [
					["Estudiantes con seguimiento", 75],
					["Bitácoras revisadas", 68],
					["Evaluaciones completadas", 50]
				],
				quick: [
					[
						"bi-people",
						"Mis estudiantes",
						"Consulta tus asignaciones",
						"/practicas"
					],
					[
						"bi-journal-text",
						"Revisar bitácoras",
						"Valida los registros",
						"/bitacoras"
					],
					[
						"bi-clipboard-check",
						"Seguimientos",
						"Registra avances y observaciones",
						"/evaluaciones"
					],
					[
						"bi-award",
						"Evaluación final",
						"Gestiona cierres",
						"/evaluaciones"
					]
				]
			},
			[ROLES.EMPRESA]: {
				eyebrow: "Gestión empresarial",
				title: "Acompaña a tus practicantes.",
				text: "Consulta los procesos vinculados a tu empresa y realiza el seguimiento del talento en práctica.",
				stats: [
					[
						"Practicantes activos",
						"1",
						"bi-people-fill"
					],
					[
						"Prácticas",
						"1",
						"bi-journal-check"
					],
					[
						"Bitácoras",
						"4",
						"bi-journal-text"
					],
					[
						"Evaluaciones",
						"1",
						"bi-award-fill"
					]
				],
				activities: [
					[
						"bi-journal-text",
						"Nueva bitácora recibida",
						"El practicante registró una nueva actividad."
					],
					[
						"bi-clipboard-check",
						"Seguimiento disponible",
						"Hay un seguimiento pendiente de revisión."
					],
					[
						"bi-award",
						"Evaluación final",
						"El proceso se aproxima a su cierre."
					]
				],
				progress: [
					["Práctica en curso", 55],
					["Bitácoras recibidas", 67],
					["Proceso de evaluación", 40]
				],
				quick: [
					[
						"bi-people",
						"Mis practicantes",
						"Consulta los procesos activos",
						"/practicas"
					],
					[
						"bi-journal-text",
						"Bitácoras",
						"Revisa actividades",
						"/bitacoras"
					],
					[
						"bi-award",
						"Evaluación final",
						"Registra tu valoración",
						"/evaluaciones"
					],
					[
						"bi-person-circle",
						"Mi perfil",
						"Actualiza tus datos",
						"/perfil"
					]
				]
			},
			[ROLES.ADMINISTRADOR]: {
				eyebrow: "Administración institucional",
				title: "Todo el proceso en un solo lugar.",
				text: "Administra usuarios, empresas, oportunidades y procesos de práctica desde el panel institucional.",
				stats: [
					[
						"Usuarios",
						"124",
						"bi-people-fill"
					],
					[
						"Empresas aliadas",
						"18",
						"bi-building-fill"
					],
					[
						"Prácticas activas",
						"32",
						"bi-journal-check"
					],
					[
						"Postulaciones",
						"67",
						"bi-send-fill"
					]
				],
				activities: [
					[
						"bi-person-plus",
						"Nuevos registros",
						"Se registraron usuarios en la plataforma."
					],
					[
						"bi-building",
						"Empresa actualizada",
						"Una empresa aliada actualizó su información."
					],
					[
						"bi-journal-check",
						"Prácticas activas",
						"Hay nuevos procesos de práctica en curso."
					]
				],
				progress: [
					["Prácticas con seguimiento", 82],
					["Empresas vigentes", 90],
					["Evaluaciones cerradas", 64]
				],
				quick: [
					[
						"bi-people",
						"Usuarios",
						"Administra cuentas y roles",
						"/usuarios"
					],
					[
						"bi-building",
						"Empresas",
						"Gestiona empresas aliadas",
						"/empresas"
					],
					[
						"bi-briefcase",
						"Puestos",
						"Administra oportunidades",
						"/postulaciones"
					],
					[
						"bi-journal-check",
						"Prácticas",
						"Consulta procesos activos",
						"/practicas"
					]
				]
			}
		};
		const data = derived(() => roleData[store_get($$store_subs ??= {}, "$user", user).rol] ?? roleData[ROLES.ESTUDIANTE]);
		$$renderer.push(`<div class="page-shell"><section class="dashboard-hero"><span class="hero-chip"><i class="bi bi-shield-check me-1"></i>${escape_html(data().eyebrow)}</span> <h2>${escape_html(data().title)}</h2> <p>Hola, <strong>${escape_html(store_get($$store_subs ??= {}, "$user", user).nombre || "Usuario")}</strong>. ${escape_html(data().text)}</p></section> <section class="stats-grid"><!--[-->`);
		const each_array = ensure_array_like(data().stats);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let stat = each_array[$$index];
			$$renderer.push(`<article class="stat-card"><div class="stat-top"><span class="stat-label">${escape_html(stat[0])}</span><span class="stat-icon"><i${attr_class(`bi ${stat[2]}`)}></i></span></div> <div class="stat-value">${escape_html(stat[1])}</div> <div class="stat-foot">Información del periodo actual</div></article>`);
		}
		$$renderer.push(`<!--]--></section> <div class="dashboard-grid"><section class="panel"><div class="panel-head"><h3>Actividad reciente</h3><a href="/dashboard">Ver todo</a></div> <div class="panel-body"><!--[-->`);
		const each_array_1 = ensure_array_like(data().activities);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let item = each_array_1[$$index_1];
			$$renderer.push(`<div class="activity-item"><div class="activity-icon"><i${attr_class(`bi ${item[0]}`)}></i></div><div><strong>${escape_html(item[1])}</strong><span>${escape_html(item[2])}</span></div></div>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="panel"><div class="panel-head"><h3>Estado del proceso</h3></div> <div class="panel-body"><!--[-->`);
		const each_array_2 = ensure_array_like(data().progress);
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let item = each_array_2[$$index_2];
			$$renderer.push(`<div class="progress-row"><div class="progress-label"><span>${escape_html(item[0])}</span><span>${escape_html(item[1])}%</span></div><div class="progress"><div class="progress-bar"${attr_style(`width:${item[1]}%`)}></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></section></div> <section class="panel mt-3"><div class="panel-head"><h3>Accesos rápidos</h3><span class="text-muted small">Según tu rol</span></div> <div class="panel-body"><div class="quick-grid"><!--[-->`);
		const each_array_3 = ensure_array_like(data().quick);
		for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
			let item = each_array_3[$$index_3];
			$$renderer.push(`<a class="quick-link"${attr("href", item[3])}><i${attr_class(`bi ${item[0]} fs-5`)}></i><div><strong>${escape_html(item[1])}</strong><span>${escape_html(item[2])}</span></div><i class="bi bi-chevron-right ms-auto text-muted"></i></a>`);
		}
		$$renderer.push(`<!--]--></div></div></section></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
