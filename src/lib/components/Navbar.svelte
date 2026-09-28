<script>
  import { page } from '$app/state';
  import { user, ROLES } from '$lib/stores/auth.js';

  const menus = {
    [ROLES.ADMINISTRADOR]: [
      { label: 'Inicio', href: '/dashboard', icon: 'bi-grid-1x2-fill' },
      { section: 'Administración' },
      { label: 'Usuarios', href: '/usuarios', icon: 'bi-people-fill' },
      { label: 'Empresas', href: '/empresas', icon: 'bi-building-fill' },
      { label: 'Puestos de práctica', href: '/postulaciones', icon: 'bi-briefcase-fill' },
      { label: 'Prácticas', href: '/practicas', icon: 'bi-journal-check' },
      { section: 'Seguimiento' },
      { label: 'Bitácoras', href: '/bitacoras', icon: 'bi-journal-text' },
      { label: 'Evaluaciones', href: '/evaluaciones', icon: 'bi-award-fill' },
      { label: 'Egresados', href: '/egresados', icon: 'bi-mortarboard-fill' }
    ],
    [ROLES.ESTUDIANTE]: [
      { label: 'Inicio', href: '/dashboard', icon: 'bi-grid-1x2-fill' },
      { section: 'Mi práctica' },
      { label: 'Puestos de práctica', href: '/postulaciones', icon: 'bi-search' },
      { label: 'Empresas', href: '/empresas', icon: 'bi-building' },
      { label: 'Mis postulaciones', href: '/postulaciones', icon: 'bi-send-fill' },
      { label: 'Mi práctica', href: '/practicas', icon: 'bi-journal-check' },
      { label: 'Mis bitácoras', href: '/bitacoras', icon: 'bi-journal-text' },
      { label: 'Mi evaluación', href: '/evaluaciones', icon: 'bi-award-fill' },
      { section: 'Cuenta' },
      { label: 'Mi perfil', href: '/perfil', icon: 'bi-person-circle' }
    ],
    [ROLES.TUTOR]: [
      { label: 'Inicio', href: '/dashboard', icon: 'bi-grid-1x2-fill' },
      { section: 'Acompañamiento' },
      { label: 'Mis estudiantes', href: '/practicas', icon: 'bi-people-fill' },
      { label: 'Prácticas asignadas', href: '/practicas', icon: 'bi-journal-check' },
      { label: 'Bitácoras', href: '/bitacoras', icon: 'bi-journal-text' },
      { label: 'Seguimientos', href: '/evaluaciones', icon: 'bi-clipboard-check' },
      { label: 'Evaluación final', href: '/evaluaciones', icon: 'bi-award-fill' },
      { section: 'Cuenta' },
      { label: 'Mi perfil', href: '/perfil', icon: 'bi-person-circle' }
    ],
    [ROLES.EMPRESA]: [
      { label: 'Inicio', href: '/dashboard', icon: 'bi-grid-1x2-fill' },
      { section: 'Practicantes' },
      { label: 'Mis practicantes', href: '/practicas', icon: 'bi-people-fill' },
      { label: 'Prácticas', href: '/practicas', icon: 'bi-journal-check' },
      { label: 'Bitácoras', href: '/bitacoras', icon: 'bi-journal-text' },
      { label: 'Evaluación final', href: '/evaluaciones', icon: 'bi-award-fill' },
      { section: 'Cuenta' },
      { label: 'Mi perfil', href: '/perfil', icon: 'bi-person-circle' }
    ]
  };

  const menu = $derived(menus[$user.rol] ?? menus[ROLES.ESTUDIANTE]);
  const roleLabel = $derived({
    [ROLES.ADMINISTRADOR]: 'Administrador',
    [ROLES.ESTUDIANTE]: 'Estudiante',
    [ROLES.TUTOR]: 'Tutor académico',
    [ROLES.EMPRESA]: 'Tutor empresarial'
  }[$user.rol]);
</script>

<aside class="app-sidebar">
  <div class="sidebar-brand">
    <div>
      <div class="brand-name">Prácticas</div>
      <div class="brand-subtitle">Gestión profesional</div>
    </div>
  </div>

  <div class="sidebar-profile">
    <div class="avatar avatar-sm">{($user.nombre || 'U').charAt(0).toUpperCase()}</div>
    <div class="profile-copy">
      <strong>{$user.nombre || 'Usuario'}</strong>
      <span>{roleLabel}</span>
    </div>
  </div>

  <nav class="sidebar-nav" aria-label="Navegación principal">
    {#each menu as item}
      {#if item.section}
        <div class="nav-section">{item.section}</div>
      {:else}
        <a class:active={page.url.pathname === item.href} class="nav-link-custom" href={item.href}>
          <i class={`bi ${item.icon}`}></i>
          <span>{item.label}</span>
        </a>
      {/if}
    {/each}
  </nav>

  <div class="sidebar-bottom">
    <a href="/perfil" class="help-card">
      <i class="bi bi-headset"></i>
      <div><strong>¿Necesitas ayuda?</strong><span>Consulta tu perfil</span></div>
    </a>
    <a href="/" class="logout-link"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a>
  </div>
</aside>
