<script>
  import { goto } from '$app/navigation';
  import { cambiarRol, ROLES } from '$lib/stores/auth.js';

  let rolSeleccionado = $state(ROLES.ESTUDIANTE);
  let mostrarPassword = $state(false);

  function handleLogin(e) {
    e.preventDefault();
    cambiarRol(rolSeleccionado);
    goto('/dashboard');
  }
</script>

<div class="login-bg">
  <div class="login-card">
    <section class="login-brand-panel">
      <div>
      
        <h1>Gestión de<br />Prácticas Profesionales</h1>
        <p>Una plataforma para conectar estudiantes, universidad y empresas durante todo el proceso de práctica.</p>

        <div class="mt-4">
          <div class="login-feature"><i class="bi bi-check-circle-fill"></i> Seguimiento académico</div>
          <div class="login-feature"><i class="bi bi-check-circle-fill"></i> Gestión de oportunidades</div>
          <div class="login-feature"><i class="bi bi-check-circle-fill"></i> Bitácoras y evaluaciones</div>
        </div>
      </div>
      <small class="text-white-50">© 2026 · Plataforma de prácticas</small>
    </section>

    <section class="login-form-panel">
      <div>
        <span class="eyebrow"><i class="bi bi-lock-fill"></i> Acceso seguro</span>
        <h2 class="fw-bold mb-2" style="color:#0f172a">Bienvenido</h2>
        <p class="text-muted small mb-4">Ingresa tus datos para acceder al portal.</p>

        <form onsubmit={handleLogin}>
          <div class="mb-3">
            <label class="form-label small fw-bold" for="emailInput">Correo institucional</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="bi bi-envelope text-muted"></i></span>
              <input id="emailInput" type="email" class="form-control border-start-0" placeholder="nombre@universidad.edu.co" required />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label small fw-bold" for="passwordInput">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="bi bi-key text-muted"></i></span>
              <input id="passwordInput" type={mostrarPassword ? 'text' : 'password'} class="form-control border-start-0 border-end-0" placeholder="Ingresa tu contraseña" required />
              <button class="btn btn-outline-secondary border-start-0" type="button" onclick={() => mostrarPassword = !mostrarPassword} aria-label="Mostrar contraseña"><i class={`bi ${mostrarPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i></button>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label small fw-bold" for="rolSelect">Tipo de usuario</label>
            <select id="rolSelect" class="form-select" bind:value={rolSeleccionado}>
              <option value={ROLES.ESTUDIANTE}>Estudiante</option>
              <option value={ROLES.TUTOR}>Tutor académico</option>
              <option value={ROLES.EMPRESA}>Tutor empresarial</option>
              <option value={ROLES.ADMINISTRADOR}>Administrador</option>
            </select>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check"><input class="form-check-input" type="checkbox" id="remember" /><label class="form-check-label small text-muted" for="remember">Recordarme</label></div>
            <a href="#recuperar" onclick={(e) => e.preventDefault()} class="small fw-semibold">¿Olvidaste tu contraseña?</a>
          </div>

          <button class="btn btn-main w-100 py-3" type="submit">Ingresar a la plataforma <i class="bi bi-arrow-right ms-2"></i></button>
        </form>
      </div>
    </section>
  </div>
</div>
