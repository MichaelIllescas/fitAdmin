const sidebarConfig = [
  {
    label: 'Socios',
    icon: '🧑‍🤝‍🧑',
    submenuId: 'submenuSocios',
    items: [
      { label: 'Registrar Socio', icon: '➕', path: '/socios/nuevo' },
      { label: 'Lista de Socios', icon: '📋', path: '/socios' },
      { label: 'Historial de Pagos', icon: '💰', path: '/socios/pagos' },
      { label: 'Historial de Asistencias', icon: '📆', path: '/socios/asistencias' }
    ]
  },
  {
    label: 'Pagos',
    icon: '💵',
    submenuId: 'submenuPagos',
    items: [
      { label: 'Registrar Pago', icon: '➕', path: '/pagos/registrar' },
      { label: 'Listado General', icon: '📃', path: '/pagos/listado-general' },
      { label: 'Historial de socios', icon: '💾', path: '/pagos/listado-socio' },
    ]
  },
  {
    label: 'Planes',
    icon: '🏷️',
    submenuId: 'submenuServicios',
    items: [
      { label: 'Registrar nuevo Plan', icon: '➕', path: '/cuotas/nueva' },
      { label: 'Ver Tipos de Planes', icon: '📄', path: '/cuotas' }
    ]
  },
  {
    label: 'Asistencias',
    icon: '📍',
    submenuId: 'submenuAsistencias',
    items: [
      { label: 'Registrar Ingreso', icon: '➕', path: '/asistencias/registrar' },
       { label: 'Asistencias por fecha', icon: '📅', path: '/asistencias/fecha' },
      { label: 'Ver Asistencias del socio', icon: '📆', path: '/asistencias/listado' }
    ]
  },
  {
    label: 'Gastos',
    icon: '💸',
    submenuId: 'submenuGastos',
    items: [
      { label: 'Registrar Gasto', icon: '➕', path: '/gastos/registrar' },
      { label: 'Ver Gastos', icon: '📋', path: '/gastos' }
    ]
  },
  {
    label: 'Finanzas',
    icon: '📈',
    submenuId: 'submenuFinanzas',
    items: [
       { label: 'Ingresos Diarios', icon: '💲', path: '/reportes/ingresos-diarios' },
      { label: 'Ingresos Mensuales', icon: '📥', path: '/reportes/ingresos' },
      { label: 'Egresos Mensuales', icon: '📤', path: '/reportes/egresos' },
      { label: 'Rentabilidad', icon: '💹', path: '/reportes/rentabilidad' },
   
    ]
  }
]

export default sidebarConfig
