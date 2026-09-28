<!-- src/routes/usuarios/+page.svelte -->
<script>
  import { user, ROLES } from '$lib/stores/auth.js';

  let busqueda = $state('');
  let filtroRol = $state('todos');

  let usuarios = $state([
    { nombre: 'Daniel Peñaranda', correo: 'daniel@universidad.edu.co', rol: 'estudiante', estado: 'Activo' },
    { nombre: 'Ana María Gómez', correo: 'ana.gomez@universidad.edu.co', rol: 'tutor', estado: 'Activo' },
    { nombre: 'Carlos Vives Ltda.', correo: 'contacto@vives.com', rol: 'empresa', estado: 'Activo' },
    { nombre: 'Sofía Martínez', correo: 'sofia.martinez@universidad.edu.co', rol: 'administrador', estado: 'Activo' }
  ]);

  // Filtrado reactivo de usuarios
  let usuariosFiltrados = $derived(
    usuarios.filter(u => {
      const coincideTexto = u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || u.correo.toLowerCase().includes(busqueda.toLowerCase());
      const coincideRol = filtroRol === 'todos' || u.rol === filtroRol;
      return coincideTexto && coincideRol;
    })
  );
</script>

<div class="bg-modulo-usuarios flex-grow-1 py-4">
  <div class="container">
    
    {#if $user.rol !== ROLES.ADMINISTRADOR}
      <div class="alert alert-danger shadow-sm text-center py-5 my-4" role="alert">
        <i class="bi bi-shield-lock-fill display-1 text-danger d-block mb-3"></i>
        <h3 class="fw-bold">Acceso Restringido</h3>
        <p class="mb-0">El módulo de <strong>Gestión de Usuarios</strong> es exclusivo para el rol de <strong>Administrador</strong>.</p>
        <small class="text-muted">Utiliza el selector del menú superior para cambiar al rol de Administrador.</small>
      </div>
    {:else}

      <!-- CONTENIDO SOLO VISIBLE PARA EL ADMINISTRADOR -->
      
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="fw-bold mb-1"><i class="bi bi-people text-info me-2"></i>Gestión de Usuarios y Roles</h2>
          <p class="text-muted small mb-0">Administra las cuentas, accesos y permisos globales de la plataforma institucional.</p>
        </div>
        <button class="btn btn-info text-white shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalUsuario">
          <i class="bi bi-person-plus me-1"></i> Crear Usuario
        </button>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
            <div class="d-flex align-items-center">
              <div class="bg-info bg-opacity-10 p-3 rounded-3 text-info me-3">
                <i class="bi bi-people-fill fs-4"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Total Usuarios</span>
                <h4 class="fw-bold mb-0">{usuarios.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
            <div class="d-flex align-items-center">
              <div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
                <i class="bi bi-mortarboard-fill fs-4"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Estudiantes</span>
                <h4 class="fw-bold mb-0">{usuarios.filter(u => u.rol === 'estudiante').length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
            <div class="d-flex align-items-center">
              <div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
                <i class="bi bi-person-badge-fill fs-4"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Tutores</span>
                <h4 class="fw-bold mb-0">{usuarios.filter(u => u.rol === 'tutor').length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
            <div class="d-flex align-items-center">
              <div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3">
                <i class="bi bi-building-fill fs-4"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Empresas / Admins</span>
                <h4 class="fw-bold mb-0">{usuarios.filter(u => u.rol === 'empresa' || u.rol === 'administrador').length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white">
        <div class="row g-3 align-items-center">
          <div class="col-md-8">
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span>
              <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por nombre o correo electrónico..." bind:value={busqueda} />
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select bg-light" bind:value={filtroRol}>
              <option value="todos">Filtrar por rol (Todos)</option>
              <option value="estudiante">Estudiante</option>
              <option value="tutor">Tutor</option>
              <option value="empresa">Empresa</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-dark py-3">
                <tr>
                  <th class="ps-4">Nombre Completo</th>
                  <th>Correo Electrónico</th>
                  <th>Rol Asignado</th>
                  <th>Estado</th>
                  <th class="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {#if usuariosFiltrados.length === 0}
                  <tr>
                    <td colspan="5" class="text-center py-4 text-muted">No se encontraron usuarios que coincidan con la búsqueda.</td>
                  </tr>
                {:else}
                  {#each usuariosFiltrados as u}
                    <tr>
                      <td class="ps-4">
                        <div class="d-flex align-items-center">
                          <div class="bg-secondary bg-opacity-25 text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.9rem;">
                            {u.nombre.substring(0, 2).toUpperCase()}
                          </div>
                          <span class="fw-bold text-dark">{u.nombre}</span>
                        </div>
                      </td>
                      <td class="text-muted">{u.correo}</td>
                      <td>
                        {#if u.rol === 'estudiante'}
                          <span class="badge bg-primary px-3 py-2 rounded-pill">Estudiante</span>
                        {:else if u.rol === 'tutor'}
                          <span class="badge bg-success px-3 py-2 rounded-pill">Tutor</span>
                        {:else if u.rol === 'empresa'}
                          <span class="badge bg-warning text-dark px-3 py-2 rounded-pill">Empresa</span>
                        {:else}
                          <span class="badge bg-dark px-3 py-2 rounded-pill">Administrador</span>
                        {/if}
                      </td>
                      <td><span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">{u.estado}</span></td>
                      <td class="text-end pe-4">
                        <button class="btn btn-sm btn-primary me-1" aria-label="Editar usuario">
                          <i class="bi bi-pencil-fill me-1"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-danger" aria-label="Eliminar usuario">
                          <i class="bi bi-trash-fill me-1"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  {/each}
                {/if}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/if}

  </div>
</div>

<div class="modal fade" id="modalUsuario" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 rounded-4 overflow-hidden shadow">
      <div class="modal-header bg-info text-white px-4 py-3">
        <h5 class="modal-title fw-bold"><i class="bi bi-person-plus-fill me-2"></i>Registrar Nuevo Usuario</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar modal"></button>
      </div>
      <div class="modal-body p-4">
        <form onsubmit={(e) => e.preventDefault()} class="row g-3">
          <div class="col-12">
            <label for="nom_u" class="form-label fw-bold small">Nombre Completo</label>
            <input type="text" id="nom_u" class="form-control bg-light" placeholder="Ej. Juan Pérez" />
          </div>
          <div class="col-md-6">
            <label for="mail_u" class="form-label fw-bold small">Correo Institucional</label>
            <input type="email" id="mail_u" class="form-control bg-light" placeholder="correo@dominio.com" />
          </div>
          <div class="col-md-6">
            <label for="rol_u" class="form-label fw-bold small">Rol del Sistema</label>
            <select id="rol_u" class="form-select bg-light">
              <option value="estudiante">Estudiante</option>
              <option value="tutor">Tutor</option>
              <option value="empresa">Empresa</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer bg-light px-4 py-3">
        <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-info text-white px-4" data-bs-dismiss="modal">Guardar Usuario</button>
      </div>
    </div>
  </div>
</div>