<script>
  import { user, ROLES } from '$lib/stores/auth.js';
</script>

<div class="bg-light flex-grow-1 py-4">
  <div class="container" style="max-width: 800px;">
    
    <!-- ENCABEZADO -->
    <div class="mb-4">
      <h2 class="fw-bold mb-1"><i class="bi bi-person-circle text-primary me-2"></i>Mi Perfil de Usuario</h2>
      <p class="text-muted small mb-0">Gestiona tu información personal y visualiza los detalles de tu cuenta en el sistema.</p>
    </div>

    <!-- TARJETA DE PERFIL -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div class="bg-primary p-4 text-white text-center position-relative">
        <div class="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow mx-auto mb-3" style="width: 90px; height: 90px; font-size: 2.5rem;">
          <i class="bi bi-person-fill"></i>
        </div>
        <h3 class="fw-bold mb-1">{$user.nombre || 'Usuario'}</h3>
        <span class="badge bg-light text-primary px-3 py-1 rounded-pill fw-bold text-uppercase">
          {$user.rol}
        </span>
      </div>

      <div class="card-body p-4 p-md-5">
        <h5 class="fw-bold text-dark mb-3"><i class="bi bi-info-circle me-2 text-primary"></i>Información de la Cuenta</h5>
        
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3">
              <span class="text-muted small d-block mb-1">Nombre Completo</span>
              <span class="fw-semibold text-dark">{$user.nombre || 'No especificado'}</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3">
              <span class="text-muted small d-block mb-1">Rol en el Sistema</span>
              <span class="fw-semibold text-dark">{$user.rol}</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3">
              <span class="text-muted small d-block mb-1">Correo Electrónico</span>
              <span class="fw-semibold text-dark">usuario@institucion.edu.co</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3">
              <span class="text-muted small d-block mb-1">Estado de Acceso</span>
              <span class="fw-semibold text-success"><i class="bi bi-check-circle-fill me-1"></i> Activo</span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-outline-primary px-4 rounded-pill" onclick={() => alert('Función de edición habilitada')}>
            <i class="bi bi-pencil-square me-1"></i> Editar Datos
          </button>
        </div>
      </div>
    </div>

  </div>
</div>