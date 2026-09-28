<script>
  import { user } from '$lib/stores/auth.js';
  import { page } from '$app/state';

  const currentTitle = $derived(
    page.url.pathname === '/dashboard'
      ? 'Inicio'
      : page.url.pathname.split('/')[1]?.replace(/-/g, ' ') || 'Inicio'
  );

  const title = $derived(
    currentTitle.charAt(0).toUpperCase() + currentTitle.slice(1)
  );
</script>

<header class="app-header">
  <div class="header-left">
    <button class="mobile-menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-label="Abrir menú">
      <i class="bi bi-list"></i>
    </button>
    <div>
      <span class="header-kicker">Gestión y segumiento de prácticas profesionales</span>
      <h1>{title}</h1>
    </div>
  </div>

  <div class="header-actions">
    <button class="icon-btn" type="button" title="Notificaciones" aria-label="Notificaciones">
      <i class="bi bi-bell"></i><span class="notification-dot"></span>
    </button>
    <a href="/perfil" class="user-menu">
      <div class="avatar">{($user.nombre || 'U').charAt(0).toUpperCase()}</div>
      <div class="user-menu-copy">
        <strong>{$user.nombre || 'Usuario'}</strong>
        <span>Ver perfil</span>
      </div>
      <i class="bi bi-chevron-down"></i>
    </a>
  </div>
</header>

<div class="offcanvas offcanvas-start mobile-sidebar" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
  <div class="offcanvas-header">
    <div class="sidebar-brand mb-0">
      <div class="brand-mark"><i class="bi bi-mortarboard-fill"></i></div>
      <div><div class="brand-name">Prácticas</div><div class="brand-subtitle">Gestión profesional</div></div>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
  </div>
  <div class="offcanvas-body p-0">
    <div class="mobile-menu-placeholder">
      <a href="/dashboard"><i class="bi bi-grid-1x2-fill"></i> Inicio</a>
      {#if $user.rol === 'administrador'}
        <a href="/usuarios"><i class="bi bi-people-fill"></i> Usuarios</a>
        <a href="/empresas"><i class="bi bi-building-fill"></i> Empresas</a>
        <a href="/postulaciones"><i class="bi bi-briefcase-fill"></i> Puestos de práctica</a>
        <a href="/practicas"><i class="bi bi-journal-check"></i> Prácticas</a>
        <a href="/bitacoras"><i class="bi bi-journal-text"></i> Bitácoras</a>
        <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Evaluaciones</a>
      {:else if $user.rol === 'estudiante'}
        <a href="/postulaciones"><i class="bi bi-search"></i> Puestos de práctica</a>
        <a href="/empresas"><i class="bi bi-building"></i> Empresas</a>
        <a href="/practicas"><i class="bi bi-journal-check"></i> Mi práctica</a>
        <a href="/bitacoras"><i class="bi bi-journal-text"></i> Mis bitácoras</a>
        <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Mi evaluación</a>
      {:else if $user.rol === 'tutor'}
        <a href="/practicas"><i class="bi bi-people-fill"></i> Mis estudiantes</a>
        <a href="/bitacoras"><i class="bi bi-journal-text"></i> Bitácoras</a>
        <a href="/evaluaciones"><i class="bi bi-clipboard-check"></i> Seguimientos</a>
        <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Evaluación final</a>
      {:else}
        <a href="/practicas"><i class="bi bi-people-fill"></i> Mis practicantes</a>
        <a href="/practicas"><i class="bi bi-journal-check"></i> Prácticas</a>
        <a href="/bitacoras"><i class="bi bi-journal-text"></i> Bitácoras</a>
        <a href="/evaluaciones"><i class="bi bi-award-fill"></i> Evaluación final</a>
      {/if}
      <a href="/perfil"><i class="bi bi-person-circle"></i> Mi perfil</a>
    </div>
  </div>
</div>
