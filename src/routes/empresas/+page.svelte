<script>
  import { user, ROLES } from '$lib/stores/auth.js';

  let busqueda = $state('');
  let filtroSector = $state('todos');

  let empresas = $state([
    { nit: '900.123.456-1', razon: 'Tech Solutions S.A.S', correo: 'contacto@techsolutions.com', sector: 'Tecnología', estado: 'Activa', vacantes: 3 },
    { nit: '800.987.654-2', razon: 'Constructora del Caribe', correo: 'proyectos@caribe.co', sector: 'Arquitectura', estado: 'Activa', vacantes: 1 },
    { nit: '901.456.789-3', razon: 'Finanzas Globales S.A.', correo: 'rrhh@finanzasglobal.com', sector: 'Finanzas', estado: 'Activa', vacantes: 2 }
  ]);

  let empresasFiltradas = $derived(
    empresas.filter(e => {
      const coincideTexto = e.razon.toLowerCase().includes(busqueda.toLowerCase()) || e.nit.includes(busqueda);
      const coincideSector = filtroSector === 'todos' || e.sector.toLowerCase() === filtroSector.toLowerCase();
      return coincideTexto && coincideSector;
    })
  );
</script>

<div class="bg-modulo-empresas flex-grow-1 py-4">
  <div class="container">
    
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h2 class="fw-bold mb-1"><i class="bi bi-building text-warning me-2"></i>Gestión de Empresas Aliadas</h2>
        <p class="text-muted small mb-0">Supervisa convenios estratégicos, plazas de práctica y perfiles corporativos vinculados.</p>
      </div>
      
      {#if $user.rol === ROLES.ADMINISTRADOR}
        <button class="btn btn-warning text-dark fw-bold shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalEmpresa">
          <i class="bi bi-plus-circle me-1"></i> Registrar Empresa
        </button>
      {/if}
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3">
              <i class="bi bi-briefcase-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Convenios Activos</span>
              <h4 class="fw-bold mb-0">{empresas.length} Empresas</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
              <i class="bi bi-patch-check-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Estado General</span>
              <h4 class="fw-bold mb-0">100% Vigentes</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
              <i class="bi bi-people-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Plazas Ofertadas</span>
              <h4 class="fw-bold mb-0">6 Cupos Totales</h4>
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
            <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por razón social o NIT..." bind:value={busqueda} />
          </div>
        </div>
        <div class="col-md-4">
          <select class="form-select bg-light" bind:value={filtroSector}>
            <option value="todos">Filtrar por sector (Todos)</option>
            <option value="tecnología">Tecnología</option>
            <option value="arquitectura">Arquitectura</option>
            <option value="finanzas">Finanzas</option>
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
                <th class="ps-4">NIT</th>
                <th>Razón Social</th>
                <th>Contacto / Email</th>
                <th>Sector</th>
                <th>Estado</th>
                <th class="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
            
              {#if empresasFiltradas.length === 0}
                <tr>
                  <td colspan="6" class="text-center py-4 text-muted">No se encontraron empresas aliadas con los criterios de búsqueda.</td>
                </tr>
              {:else}
                {#each empresasFiltradas as e}
                  <tr>
                    <td class="ps-4 fw-semibold text-secondary">{e.nit}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="bg-warning bg-opacity-25 text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.85rem;">
                          <i class="bi bi-building"></i>
                        </div>
                        <span class="fw-bold text-dark">{e.razon}</span>
                      </div>
                    </td>

                    <td class="text-muted">{e.correo}</td>
                    <td><span class="badge bg-light text-dark border px-2 py-1">{e.sector}</span></td>
                    <td><span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">{e.estado}</span></td>
                    <td class="text-end pe-4">
                      

                      {#if $user.rol === ROLES.ADMINISTRADOR}
                        <button class="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#modalEmpresa" aria-label="Editar empresa">
                          <i class="bi bi-pencil-fill me-1"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-danger" aria-label="Eliminar empresa">
                          <i class="bi bi-trash-fill me-1"></i> Eliminar
                        </button>
                      
                      {:else if $user.rol === ROLES.EMPRESA}
                        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalEmpresa">
                          <i class="bi bi-gear me-1"></i> Mi Perfil
                        </button>
                      
                      
                      {:else}
                        <span class="badge bg-secondary px-3 py-2">Solo Lectura</span>
                      {/if}
                    </td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</div>

<div class="modal fade" id="modalEmpresa" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 rounded-4 overflow-hidden shadow">
      <div class="modal-header bg-warning text-dark px-4 py-3">
        <h5 class="modal-title fw-bold"><i class="bi bi-building-add me-2"></i>Información de la Empresa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar modal"></button>
      </div>

      <div class="modal-body p-4">
        <form onsubmit={(e) => e.preventDefault()} class="row g-3">
          <div class="col-md-6">
            <label for="nit_emp" class="form-label fw-bold small">NIT</label>
            <input type="text" id="nit_emp" class="form-control bg-light" placeholder="900.000.000-0" />
          </div>

          <div class="col-md-6">
            <label for="razon_emp" class="form-label fw-bold small">Razón Social</label>
            <input type="text" id="razon_emp" class="form-control bg-light" placeholder="Nombre Empresa S.A.S" />
          </div>
        
          <div class="col-12">
            <label for="email_emp" class="form-label fw-bold small">Correo Institucional / Contacto</label>
            <input type="email" id="email_emp" class="form-control bg-light" placeholder="contacto@empresa.com" />
          </div>
        </form>
      </div>

      <div class="modal-footer bg-light px-4 py-3">
        <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-warning text-dark fw-bold px-4" data-bs-dismiss="modal">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>