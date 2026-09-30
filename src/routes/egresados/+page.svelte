<script>
  import { user, ROLES } from '$lib/stores/auth.js';

  let busqueda = $state('');
  let filtroEstado = $state('todos');

  let egresados = $state([
    { 
      id: 1, 
      estudiante: 'Juan Pablo Martínez', 
      empresa: 'Tech Solutions S.A.S', 
      fecha: '2026-06-15', 
      calificacion: 4.8, 
      estado: 'Contratado en Empresa Práctica' 
    },
    { 
      id: 2, 
      estudiante: 'Andrea Valentina Gómez', 
      empresa: 'SoftCol S.A.', 
      fecha: '2026-05-20', 
      calificacion: 4.9, 
      estado: 'Empleado en otra Empresa' 
    },
    { 
      id: 3, 
      estudiante: 'Carlos Andrés Ruiz', 
      empresa: 'Innovación Digital Colombia', 
      fecha: '2026-04-10', 
      calificacion: 4.5, 
      estado: 'En búsqueda activa' 
    }
  ]);
  
  let egresadosFiltrados = $derived(
    egresados.filter(e => {
      const coincideTexto = e.estudiante.toLowerCase().includes(busqueda.toLowerCase()) || e.empresa.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = filtroEstado === 'todos' || e.estado.toLowerCase().includes(filtroEstado.toLowerCase());
      return coincideTexto && coincideEstado;
    })
  );
</script>

<div class="bg-modulo-usuarios flex-grow-1 py-4">
  <div class="container">
 

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h2 class="fw-bold mb-1"><i class="bi bi-mortarboard-fill text-primary me-2"></i>Histórico de Egresados y Finalizados</h2>
        <p class="text-muted small mb-0">Control de inserción laboral, calificaciones finales y seguimiento de prácticas profesionales.</p>
      </div>
      
      {#if $user.rol === ROLES.ADMINISTRADOR}
        <button class="btn btn-primary text-white fw-bold shadow-sm rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalEgresado">
          <i class="bi bi-plus-circle-fill me-1"></i> Registrar Egresado
        </button>
      {/if}
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
              <i class="bi bi-people-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Total Registrados</span>
              <h4 class="fw-bold mb-0">{egresados.length} Egresados</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
              <i class="bi bi-award-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Promedio de Calificación</span>
              <h4 class="fw-bold mb-0">4.7 / 5.0</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
          <div class="d-flex align-items-center">
            <div class="bg-info bg-opacity-10 p-3 rounded-3 text-info me-3">
              <i class="bi bi-briefcase-fill fs-4"></i>
            </div>
            <div>
              <span class="text-muted small d-block">Tasa de Empleabilidad</span>
              <h4 class="fw-bold mb-0">Alta (Ocupados)</h4>
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
            <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar por estudiante o empresa..." bind:value={busqueda} />
          </div>
        </div>
        <div class="col-md-4">
          <select class="form-select bg-light" bind:value={filtroEstado}>
            <option value="todos">Filtrar por estado (Todos)</option>
            <option value="Contratado">Contratado</option>
            <option value="otra Empresa">Otra Empresa</option>
            <option value="búsqueda">En búsqueda</option>
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
                <th class="ps-4">Estudiante</th>
                <th>Empresa de Práctica</th>
                <th>Fecha Culminación</th>
                <th>Calificación Final</th>
                <th>Estado Laboral</th>
                <th class="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#if egresadosFiltrados.length === 0}
                <tr>
                  <td colspan="6" class="text-center py-5 text-muted">
                    <i class="bi bi-folder-x fs-2 d-block mb-2"></i>
                    No se encontraron registros que coincidan con la búsqueda.
                  </td>
                </tr>
              {:else}
                {#each egresadosFiltrados as item}
                  <tr>
                    <td class="ps-4">
                      <div class="d-flex align-items-center py-1">
                        <div class="bg-primary bg-opacity-15 text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                          <i class="bi bi-person-fill"></i>
                        </div>
                        <div>
                          <span class="fw-bold text-dark d-block">{item.estudiante}</span>
                          <span class="text-muted small">ID: #{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td><i class="bi bi-building me-1 text-muted"></i>{item.empresa}</td>
                    <td><span class="text-muted small"><i class="bi bi-calendar-event me-1"></i>{item.fecha}</span></td>
                    <td>
                      <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-bold">
                        {item.calificacion} / 5.0
                      </span>
                    </td>
                    <td>
                      {#if item.estado.includes('Contratado')}
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill">
                          <i class="bi bi-check-circle me-1"></i> {item.estado}
                        </span>
                      {:else if item.estado.includes('otra')}
                        <span class="badge bg-info-subtle text-info border border-info-subtle px-3 py-1 rounded-pill">
                          <i class="bi bi-briefcase me-1"></i> {item.estado}
                        </span>
                      {:else}
                        <span class="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-1 rounded-pill">
                          <i class="bi bi-clock me-1"></i> {item.estado}
                        </span>
                      {/if}
                    </td>
                    <td class="text-end pe-4">
                      {#if $user.rol === ROLES.ADMINISTRADOR}
                        <div class="d-flex justify-content-end gap-1">
                          <button class="btn btn-sm btn-outline-primary rounded-pill px-3" aria-label="Editar registro egresado">
                            <i class="bi bi-pencil me-1"></i> Editar
                          </button>
                          <button class="btn btn-sm btn-outline-danger rounded-pill px-3" aria-label="Eliminar registro egresado">
                            <i class="bi bi-trash me-1"></i> Eliminar
                          </button>
                        </div>
                      {:else}
                        <button class="btn btn-sm btn-outline-secondary rounded-pill px-3" aria-label="Ver certificado">
                          <i class="bi bi-file-earmark-pdf me-1"></i> Certificado
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

<div class="modal fade" id="modalEgresado" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 rounded-4 shadow overflow-hidden">
      <div class="modal-header bg-primary text-white px-4 py-3">
        <h5 class="modal-title fw-bold"><i class="bi bi-person-plus-fill me-2"></i>Registro de Egresado</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar modal"></button>
      </div>
      <div class="modal-body p-4">
        <form onsubmit={(e) => e.preventDefault()} class="row g-3">
          <div class="col-12">
            <label for="est_egr" class="form-label fw-semibold small">Estudiante</label>
            <input type="text" id="est_egr" class="form-control bg-light" placeholder="Nombre completo del estudiante" />
          </div>
          <div class="col-12">
            <label for="emp_egr" class="form-label fw-semibold small">Empresa de Práctica</label>
            <input type="text" id="emp_egr" class="form-control bg-light" placeholder="Nombre de la empresa" />
          </div>
          <div class="col-md-6">
            <label for="fec_egr" class="form-label fw-semibold small">Fecha Culminación</label>
            <input type="date" id="fec_egr" class="form-control bg-light" />
          </div>
          <div class="col-md-6">
            <label for="cal_egr" class="form-label fw-semibold small">Calificación Final</label>
            <input type="number" step="0.1" max="5.0" min="0" id="cal_egr" class="form-control bg-light" placeholder="Ej. 4.8" />
          </div>
          <div class="col-12">
            <label for="est_lab" class="form-label fw-semibold small">Estado Laboral</label>
            <select id="est_lab" class="form-select bg-light">
              <option>Contratado en Empresa Práctica</option>
              <option>Empleado en otra Empresa</option>
              <option>En búsqueda activa</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer bg-light px-4 py-3">
        <button type="button" class="btn btn-outline-secondary px-4 rounded-pill" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary px-4 rounded-pill text-white" data-bs-dismiss="modal">Guardar Egresado</button>
      </div>
    </div>
  </div>
</div>