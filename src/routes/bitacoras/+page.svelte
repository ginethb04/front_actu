<!-- src/routes/bitacoras/+page.svelte -->
<script>
  import { user, ROLES } from '$lib/stores/auth.js';

  let busqueda = $state('');
  let filtroEstado = $state('todos');


  let bitacoras = $state([
    { id: 1, semana: 'Semana 1', estudiante: 'Daniel Peñaranda', horas: 40, fecha: '2026-09-04', estado: 'Aprobada' },
    { id: 2, semana: 'Semana 2', estudiante: 'Daniel Peñaranda', horas: 40, fecha: '2026-09-11', estado: 'Pendiente' },
    { id: 3, semana: 'Semana 3', estudiante: 'Daniel Peñaranda', horas: 40, fecha: '2026-09-18', estado: 'Revisión' }
  ]);


  let bitacorasFiltradas = $derived(
    bitacoras.filter(b => {
      const coincideTexto = b.estudiante.toLowerCase().includes(busqueda.toLowerCase()) || b.semana.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = filtroEstado === 'todos' || b.estado.toLowerCase() === filtroEstado.toLowerCase();
      return coincideTexto && coincideEstado;
    })
  );
</script>

<div class="bg-modulo-bitacoras flex-grow-1 py-4">
  <div class="container">
    
    <!-- ENCABEZADO INSTITUCIONAL -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h2 class="fw-bold mb-1"><i class="bi bi-journal-text text-success me-2"></i>Gestión de Bitácoras de Práctica</h2>
        <p class="text-muted small mb-0">Registro y supervisión de reportes semanales de actividades y acumulación de horas del periodo.</p>
      </div>
      
      <!-- BOTÓN DE REGISTRAR BITÁCORA  -->
      {#if $user.rol === ROLES.ESTUDIANTE}
        <button class="btn btn-success text-white fw-bold shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalBitacora">
          <i class="bi bi-plus-circle me-1"></i> Registrar Bitácora
        </button>
      {/if}
    </div>

    <!-- TARJETAS -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
              <i class="bi bi-journal-check fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Bitácoras Enviadas</span>
              <h4 class="fw-bold mb-0">3 / 12 Registros</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
              <i class="bi bi-clock-history fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Horas Acumuladas</span>
              <h4 class="fw-bold mb-0">120 Horas</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3">
              <i class="bi bi-hourglass-split fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Porcentaje de Avance</span>
              <h4 class="fw-bold mb-0">31.5% Cumplido</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BARRA DE HERRAMIENTAS -->
    <div class="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white">
      <div class="row g-3 align-items-center">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por estudiante o semana..." bind:value={busqueda} />
          </div>
        </div>
        <div class="col-md-4">
          <select class="form-select bg-light" bind:value={filtroEstado}>
            <option value="todos">Filtrar por estado (Todos)</option>
            <option value="aprobada">Aprobada</option>
            <option value="pendiente">Pendiente</option>
            <option value="revisión">En Revisión</option>
          </select>
        </div>
      </div>
    </div>

    <!-- TABLA DE BITÁCORAS -->
    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark py-3">
              <tr>
                <th class="ps-4">Periodo / Semana</th>
                <th>Estudiante</th>
                <th>Horas Reportadas</th>
                <th>Fecha de Envío</th>
                <th>Estado</th>
                <th class="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#if bitacorasFiltradas.length === 0}
                <tr>
                  <td colspan="6" class="text-center py-4 text-muted">No se encontraron bitácoras con los criterios de búsqueda.</td>
                </tr>
              {:else}
                {#each bitacorasFiltradas as b}
                  <tr>
                    <td class="ps-4">
                      <div class="d-flex align-items-center">
                        <div class="bg-success bg-opacity-25 text-success fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.85rem;">
                          <i class="bi bi-journal-bookmark"></i>
                        </div>
                        <span class="fw-bold text-dark">{b.semana}</span>
                      </div>
                    </td>
                    <td class="text-dark">{b.estudiante}</td>
                    <td><span class="badge bg-light text-dark border px-2 py-1">{b.horas} Horas</span></td>
                    <td class="text-muted small"><i class="bi bi-calendar-event me-1"></i>{b.fecha}</td>
                    <td>
                      {#if b.estado === 'Aprobada'}
                        <span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">Aprobada</span>
                      {:else if b.estado === 'Pendiente'}
                        <span class="badge bg-warning-subtle text-warning text-dark px-3 py-1 rounded-pill">Pendiente</span>
                      {:else}
                        <span class="badge bg-info-subtle text-info px-3 py-1 rounded-pill">En Revisión</span>
                      {/if}
                    </td>
                    <td class="text-end pe-4">
                      {#if $user.rol === ROLES.TUTOR || $user.rol === ROLES.ADMINISTRADOR}
                        <button class="btn btn-sm btn-success me-1">
                          <i class="bi bi-check-lg me-1"></i> Aprobar
                        </button>
                      {/if}
                      <button class="btn btn-sm btn-outline-primary px-3">
                        <i class="bi bi-eye me-1"></i> Ver Detalle
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

  </div>
</div>

<!-- BITÁCORA -->
<div class="modal fade" id="modalBitacora" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 rounded-4 overflow-hidden shadow">
      <div class="modal-header bg-success text-white px-4 py-3">
        <h5 class="modal-title fw-bold"><i class="bi bi-journal-plus me-2"></i>Registrar Nueva Bitácora</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar modal"></button>
      </div>
      <div class="modal-body p-4">
        <form onsubmit={(e) => e.preventDefault()} class="row g-3">
          <div class="col-md-6">
            <label for="sem_b" class="form-label fw-bold small">Semana de Práctica</label>
            <select id="sem_b" class="form-select bg-light">
              <option value="Semana 1">Semana 1</option>
              <option value="Semana 2">Semana 2</option>
              <option value="Semana 3">Semana 3</option>
              <option value="Semana 4">Semana 4</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="horas_b" class="form-label fw-bold small">Horas Acumuladas</label>
            <input type="number" id="horas_b" class="form-control bg-light" placeholder="40" min="1" />
          </div>
          <div class="col-12">
            <label for="desc_b" class="form-label fw-bold small">Descripción de Actividades</label>
            <textarea id="desc_b" class="form-control bg-light" rows="3" placeholder="Detalla los logros y tareas realizadas esta semana..."></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer bg-light px-4 py-3">
        <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success text-white px-4" data-bs-dismiss="modal">Enviar Bitácora</button>
      </div>
    </div>
  </div>
</div>