import { b as escape_html, i as ensure_array_like, o as store_get, r as derived, s as unsubscribe_stores, t as attr_class, y as attr } from "../../chunks/server.js";
import { n as user, t as ROLES } from "../../chunks/auth.js";
import { t as page } from "../../chunks/state.js";
//#region src/lib/components/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const currentTitle = derived(() => page.url.pathname === "/dashboard" ? "Inicio" : page.url.pathname.split("/")[1]?.replace(/-/g, " ") || "Inicio");
		const title = derived(() => currentTitle().charAt(0).toUpperCase() + currentTitle().slice(1));
		$$renderer.push(`<header class="app-header"><div class="header-left"><button class="mobile-menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-label="Abrir menú"><i class="bi bi-list"></i></button> <div><span class="header-kicker">Gestión y segumiento de prácticas profesionales</span> <h1>${escape_html(title())}</h1></div></div> <div class="header-actions"><button class="icon-btn" type="button" title="Notificaciones" aria-label="Notificaciones"><i class="bi bi-bell"></i><span class="notification-dot"></span></button> <a href="/perfil" class="user-menu"><div class="avatar">${escape_html((store_get($$store_subs ??= {}, "$user", user).nombre || "U").charAt(0).toUpperCase())}</div> <div class="user-menu-copy"><strong>${escape_html(store_get($$store_subs ??= {}, "$user", user).nombre || "Usuario")}</strong> <span>Ver perfil</span></div> <i class="bi bi-chevron-down"></i></a></div></header> <div class="offcanvas offcanvas-start mobile-sidebar" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel"><div class="offcanvas-header"><div class="sidebar-brand mb-0"><div class="brand-mark"><i class="bi bi-mortarboard-fill"></i></div> <div><div class="brand-name">Prácticas</div><div class="brand-subtitle">Gestión profesional</div></div></div> <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button></div> <div class="offcanvas-body p-0"><div class="mobile-menu-placeholder"><a href="/dashboard"><i class="bi bi-grid-1x2-fill"></i> Inicio</a> `);
		if (store_get($$store_subs ??= {}, "$user", user).rol === "administrador") $$renderer.push(`<!--[0--><a href="/usuarios"><i class="bi bi-people-fill"></i> Usuarios</a> <a href="/empresas"><i class="bi bi-building-fill"></i> Empresas</a> <a href="/postulaciones"><i class="bi bi-briefcase-fill"></i> Puestos de práctica</a> <a href="/practicas"><i class="bi bi-journal-check"></i> Prácticas</a> <a href="/bitacoras"><i class="bi bi-journal-text"></i> Bitácoras</a> <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Evaluaciones</a>`);
		else if (store_get($$store_subs ??= {}, "$user", user).rol === "estudiante") $$renderer.push(`<!--[1--><a href="/postulaciones"><i class="bi bi-search"></i> Puestos de práctica</a> <a href="/empresas"><i class="bi bi-building"></i> Empresas</a> <a href="/practicas"><i class="bi bi-journal-check"></i> Mi práctica</a> <a href="/bitacoras"><i class="bi bi-journal-text"></i> Mis bitácoras</a> <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Mi evaluación</a>`);
		else if (store_get($$store_subs ??= {}, "$user", user).rol === "tutor") $$renderer.push(`<!--[2--><a href="/practicas"><i class="bi bi-people-fill"></i> Mis estudiantes</a> <a href="/bitacoras"><i class="bi bi-journal-text"></i> Bitácoras</a> <a href="/evaluaciones"><i class="bi bi-clipboard-check"></i> Seguimientos</a> <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Evaluación final</a>`);
		else $$renderer.push(`<!--[-1--><a href="/practicas"><i class="bi bi-people-fill"></i> Mis practicantes</a> <a href="/practicas"><i class="bi bi-journal-check"></i> Prácticas</a> <a href="/bitacoras"><i class="bi bi-journal-text"></i> Bitácoras</a> <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Evaluación final</a>`);
		$$renderer.push(`<!--]--> <a href="/perfil"><i class="bi bi-person-circle"></i> Mi perfil</a></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/Navbar.svelte
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const menus = {
			[ROLES.ADMINISTRADOR]: [
				{
					label: "Inicio",
					href: "/dashboard",
					icon: "bi-grid-1x2-fill"
				},
				{ section: "Administración" },
				{
					label: "Usuarios",
					href: "/usuarios",
					icon: "bi-people-fill"
				},
				{
					label: "Empresas",
					href: "/empresas",
					icon: "bi-building-fill"
				},
				{
					label: "Puestos de práctica",
					href: "/postulaciones",
					icon: "bi-briefcase-fill"
				},
				{
					label: "Prácticas",
					href: "/practicas",
					icon: "bi-journal-check"
				},
				{ section: "Seguimiento" },
				{
					label: "Bitácoras",
					href: "/bitacoras",
					icon: "bi-journal-text"
				},
				{
					label: "Evaluaciones",
					href: "/evaluaciones",
					icon: "bi-award-fill"
				},
				{
					label: "Egresados",
					href: "/egresados",
					icon: "bi-mortarboard-fill"
				}
			],
			[ROLES.ESTUDIANTE]: [
				{
					label: "Inicio",
					href: "/dashboard",
					icon: "bi-grid-1x2-fill"
				},
				{ section: "Mi práctica" },
				{
					label: "Puestos de práctica",
					href: "/postulaciones",
					icon: "bi-search"
				},
				{
					label: "Empresas",
					href: "/empresas",
					icon: "bi-building"
				},
				{
					label: "Mis postulaciones",
					href: "/postulaciones",
					icon: "bi-send-fill"
				},
				{
					label: "Mi práctica",
					href: "/practicas",
					icon: "bi-journal-check"
				},
				{
					label: "Mis bitácoras",
					href: "/bitacoras",
					icon: "bi-journal-text"
				},
				{
					label: "Mi evaluación",
					href: "/evaluaciones",
					icon: "bi-award-fill"
				},
				{ section: "Cuenta" },
				{
					label: "Mi perfil",
					href: "/perfil",
					icon: "bi-person-circle"
				}
			],
			[ROLES.TUTOR]: [
				{
					label: "Inicio",
					href: "/dashboard",
					icon: "bi-grid-1x2-fill"
				},
				{ section: "Acompañamiento" },
				{
					label: "Mis estudiantes",
					href: "/practicas",
					icon: "bi-people-fill"
				},
				{
					label: "Prácticas asignadas",
					href: "/practicas",
					icon: "bi-journal-check"
				},
				{
					label: "Bitácoras",
					href: "/bitacoras",
					icon: "bi-journal-text"
				},
				{
					label: "Seguimientos",
					href: "/evaluaciones",
					icon: "bi-clipboard-check"
				},
				{
					label: "Evaluación final",
					href: "/evaluaciones",
					icon: "bi-award-fill"
				},
				{ section: "Cuenta" },
				{
					label: "Mi perfil",
					href: "/perfil",
					icon: "bi-person-circle"
				}
			],
			[ROLES.EMPRESA]: [
				{
					label: "Inicio",
					href: "/dashboard",
					icon: "bi-grid-1x2-fill"
				},
				{ section: "Practicantes" },
				{
					label: "Mis practicantes",
					href: "/practicas",
					icon: "bi-people-fill"
				},
				{
					label: "Prácticas",
					href: "/practicas",
					icon: "bi-journal-check"
				},
				{
					label: "Bitácoras",
					href: "/bitacoras",
					icon: "bi-journal-text"
				},
				{
					label: "Evaluación final",
					href: "/evaluaciones",
					icon: "bi-award-fill"
				},
				{ section: "Cuenta" },
				{
					label: "Mi perfil",
					href: "/perfil",
					icon: "bi-person-circle"
				}
			]
		};
		const menu = derived(() => menus[store_get($$store_subs ??= {}, "$user", user).rol] ?? menus[ROLES.ESTUDIANTE]);
		const roleLabel = derived(() => ({
			[ROLES.ADMINISTRADOR]: "Administrador",
			[ROLES.ESTUDIANTE]: "Estudiante",
			[ROLES.TUTOR]: "Tutor académico",
			[ROLES.EMPRESA]: "Tutor empresarial"
		})[store_get($$store_subs ??= {}, "$user", user).rol]);
		$$renderer.push(`<aside class="app-sidebar"><div class="sidebar-brand"><div><div class="brand-name">Prácticas</div> <div class="brand-subtitle">Gestión profesional</div></div></div> <div class="sidebar-profile"><div class="avatar avatar-sm">${escape_html((store_get($$store_subs ??= {}, "$user", user).nombre || "U").charAt(0).toUpperCase())}</div> <div class="profile-copy"><strong>${escape_html(store_get($$store_subs ??= {}, "$user", user).nombre || "Usuario")}</strong> <span>${escape_html(roleLabel())}</span></div></div> <nav class="sidebar-nav" aria-label="Navegación principal"><!--[-->`);
		const each_array = ensure_array_like(menu());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			if (item.section) $$renderer.push(`<!--[0--><div class="nav-section">${escape_html(item.section)}</div>`);
			else $$renderer.push(`<!--[-1--><a${attr_class("nav-link-custom", void 0, { "active": page.url.pathname === item.href })}${attr("href", item.href)}><i${attr_class(`bi ${item.icon}`)}></i> <span>${escape_html(item.label)}</span></a>`);
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></nav> <div class="sidebar-bottom"><a href="/perfil" class="help-card"><i class="bi bi-headset"></i> <div><strong>¿Necesitas ayuda?</strong><span>Consulta tu perfil</span></div></a> <a href="/" class="logout-link"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a></div></aside>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/Footer.svelte
function Footer($$renderer) {
	$$renderer.push(`<footer class="app-footer"><div>© 2026 · Sistema de Gestión de Prácticas Profesionales</div> <div class="footer-links"><span>Universidad</span><span>•</span><span>Soporte</span></div></footer>`);
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		$$renderer.push(`<div${attr_class("app-shell", void 0, { "login-shell": page.url.pathname === "/login" })}>`);
		if (page.url.pathname !== "/login") {
			$$renderer.push("<!--[0-->");
			Navbar($$renderer, {});
			$$renderer.push(`<!----> <div class="app-main">`);
			Header($$renderer, {});
			$$renderer.push(`<!----> <main class="app-content">`);
			children($$renderer);
			$$renderer.push(`<!----></main> `);
			Footer($$renderer, {});
			$$renderer.push(`<!----></div>`);
		} else {
			$$renderer.push(`<!--[-1--><main class="login-shell-inner">`);
			children($$renderer);
			$$renderer.push(`<!----></main>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _layout as default };
