<!-- src/routes/postulaciones/+page.svelte -->
<script>
  import { user, ROLES } from '$lib/stores/auth.js';

  // Estados reactivos para búsqueda y filtros
  let busqueda = $state('');
  let filtroEstado = $state('todos');

  let ofertas = $state([
    { id: 1, titulo: 'Desarrollador Junior Frontend', empresa: 'Tech Solutions S.A.S', vacantes: 2, cierre: '2026-10-15', estado: 'Abierta' },
    { id: 2, titulo: 'Practicante de Arquitectura y Diseño', empresa: 'Constructora del Caribe', vacantes: 1, cierre: '2026-10-20', estado: 'Abierta' },
    { id: 3, titulo: 'Analista Financiero Junior', empresa: 'Finanzas Globales S.A.', vacantes: 3, cierre: '2026-09-30', estado: 'Cerrada' }
  ]);

  let ofertasFiltradas = $derived(
    ofertas.filter(o => {
      const coincideTexto = o.titulo.toLowerCase().includes(busqueda.toLowerCase()) || o.empresa.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = filtroEstado === 'todos' || o.estado.toLowerCase() === filtroEstado.toLowerCase();
      return coincideTexto && coincideEstado;
    })
  );
</script>

<div class="bg-modulo-postulaciones flex-grow-1 py-4">
  <div class="container">
    
    <!-- ENCABEZADO INSTITUCIONAL -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h2 class="fw-bold mb-1"><i class="bi bi-briefcase-fill text-success me-2"></i>Ofertas y Postulaciones</h2>
        <p class="text-muted small mb-0">Explora la bolsa de vacantes institucionales y gestiona el estado de tus postulaciones.</p>
      </div>
      
      <!-- BOTÓN DE PUBLICAR OFERTA -->
      {#if $user.rol === ROLES.ADMINISTRADOR || $user.rol === ROLES.EMPRESA}
        <button class="btn btn-success text-white fw-bold shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalOferta">
          <i class="bi bi-plus-circle me-1"></i> Publicar Oferta
        </button>
      {/if}
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
              <i class="bi bi-briefcase fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Ofertas Activas</span>
              <h4 class="fw-bold mb-0">{ofertas.filter(o => o.estado === 'Abierta').length} Disponibles</h4>
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
              <span class="text-muted small d-block">Cupos Totales</span>
              <h4 class="fw-bold mb-0">6 Plazas</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3">
              <i class="bi bi-send-check-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Mi Estado</span>
              <h4 class="fw-bold mb-0">Postulado</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BARRA DE HERRAMIENTAS  -->
    <div class="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white">
      <div class="row g-3 align-items-center">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por título de oferta o empresa aliada..." bind:value={busqueda} />
          </div>
        </div>
        <div class="col-md-4">
          <select class="form-select bg-light" bind:value={filtroEstado}>
            <option value="todos">Filtrar por estado (Todos)</option>
            <option value="abierta">Abierta</option>
            <option value="cerrada">Cerrada</option>
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
                <th class="ps-4">ID</th>
                <th>Título de la Oferta</th>
                <th>Empresa</th>
                <th>Vacantes</th>
                <th>Fecha Cierre</th>
                <th>Estado</th>
                <th class="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#if ofertasFiltradas.length === 0}
                <tr>
                  <td colspan="7" class="text-center py-4 text-muted">No se encontraron ofertas que coincidan con la búsqueda.</td>
                </tr>
              {:else}
                {#each ofertasFiltradas as o}
                  <tr>
                    <td class="ps-4 fw-semibold text-secondary">#{o.id}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="bg-success bg-opacity-25 text-success fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px; font-size: 0.85rem;">
                          <i class="bi bi-file-earmark-text"></i>
                        </div>
                        <span class="fw-bold text-dark">{o.titulo}</span>
                      </div>
                    </td>
                    <td class="text-muted">{o.empresa}</td>
                    <td><span class="badge bg-light text-dark border px-2 py-1">{o.vacantes} Cupos</span></td>
                    <td class="text-muted small"><i class="bi bi-calendar-event me-1"></i>{o.cierre}</td>
                    <td>
                      {#if o.estado === 'Abierta'}
                        <span class="badge bg-success-subtle text-success px-3 py-1 rounded-pill">Abierta</span>
                      {:else}
                        <span class="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill">Cerrada</span>
                      {/if}
                    </td>
                    <td class="text-end pe-4">
                      {#if $user.rol === ROLES.ESTUDIANTE}
                        <button class="btn btn-sm btn-outline-success px-3">
                          <i class="bi bi-send me-1"></i> Postularme
                        </button>
                      {:else}
                        <button class="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#modalOferta" aria-label="Editar oferta">
                          <i class="bi bi-pencil-fill me-1"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-danger" aria-label="Eliminar oferta">
                          <i class="bi bi-trash-fill me-1"></i> Eliminar
                        </button>
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

<div class="modal fade" id="modalOferta" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 rounded-4 overflow-hidden shadow">
      <div class="modal-header bg-success text-white px-4 py-3">
        <h5 class="modal-title fw-bold"><i class="bi bi-briefcase-fill me-2"></i>Gestión de Oferta de Práctica</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar modal"></button>
      </div>
      <div class="modal-body p-4">
        <form onsubmit={(e) => e.preventDefault()} class="row g-3">
          <div class="col-12">
            <label for="titulo_o" class="form-label fw-bold small">Título de la Oferta</label>
            <input type="text" id="titulo_o" class="form-control bg-light" placeholder="Ej. Desarrollador Junior Frontend" />
          </div>
          <div class="col-md-6">
            <label for="vacantes_o" class="form-label fw-bold small">Número de Vacantes</label>
            <input type="number" id="vacantes_o" class="form-control bg-light" placeholder="1" min="1" />
          </div>
          <div class="col-md-6">
            <label for="cierre_o" class="form-label fw-bold small">Fecha de Cierre</label>
            <input type="date" id="cierre_o" class="form-control bg-light" />
          </div>
        </form>
      </div>
      <div class="modal-footer bg-light px-4 py-3">
        <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success text-white px-4" data-bs-dismiss="modal">Guardar Oferta</button>
      </div>
    </div>
  </div>
</div>