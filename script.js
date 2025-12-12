const prerequisitos = {
  // 2° semestre
  fisica: ['algebra'],
  histoembriologia: ['anatomia', 'biocel'],
  quimica_organica: ['quimica_general'],

  // 3° semestre
  bioquimica: ['quimica_organica'],
  fisiologia: ['histoembriologia'],
  bioetica: ['intro_tm'],
  infectologia: ['biocel', 'lab_biocel'],
  ingles2: ['ingles1'],

  // 4° semestre
  farmaco: ['bioquimica'],
  ingles3: ['ingles2'],
  fisiopato: ['fisiologia'],
  psicoacustica: ['fisiologia', 'bioquimica', 'bioetica', 'infectologia', 'ingles2', 'fisica'],
  neuroanatomia_orl: ['fisiologia', 'bioquimica', 'bioetica', 'infectologia', 'ingles2', 'fisica'],
  lengua_senas: ['fisiologia', 'bioquimica', 'bioetica', 'infectologia', 'ingles2', 'fisica'],

  // 5° semestre
  ingles4: ['ingles3'],
  salud_pub1: ['fisiopato'],
  procedimientos: ['farmaco'],
  morfofisio_orl: ['fisiopato', 'psicoacustica'],
  funcion_nasal: ['fisiopato'],
  neurofisiologia_orl: ['neuroanatomia_orl'],

  // 6° semestre
  pensamiento: [],
  salud_pub2: ['salud_pub1', 'procedimientos'],
  audiologia_basica: ['morfofisio_orl', 'neurofisiologia_orl', 'lengua_senas'],
  otoneuro: ['morfofisio_orl', 'neurofisiologia_orl'],

  // 7° semestre
  gestion_salud: ['salud_pub2', 'funcion_nasal'],
  educacion_salud: ['salud_pub2'],
  audiologia_avanzada: ['audiologia_basica'],
  otoneuro2: ['audiologia_basica', 'otoneuro'],
  integrador1: ['audiologia_basica', 'otoneuro'],

  // 8° semestre
  aseguramiento: ['gestion_salud', 'otoneuro2'],
  investigacion: ['salud_pub2', 'otoneuro2'],
  salud_ocupacional: ['audiologia_avanzada', 'integrador1'],
  protesis: ['audiologia_avanzada', 'integrador1'],
  rehab_vestibular: ['audiologia_avanzada', 'otoneuro2'],

  // 9° semestre
  seminario: ['investigacion', 'aseguramiento', 'salud_ocupacional', 'protesis', 'rehab_vestibular'],

  // 10° semestre
  integrador2: ['seminario']
};

// ===============================
// Funciones sistema
// ===============================
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobadosOTO');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(lista) {
  localStorage.setItem('mallaAprobadosOTO', JSON.stringify(lista));
}

function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [ramo, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(ramo);
    if (!elem) continue;

    const ok = reqs.every(r => aprobados.includes(r));

    if (elem.classList.contains('aprobado')) {
      elem.classList.remove('bloqueado');
    } else {
      elem.classList.toggle('bloqueado', !ok);
    }
  }
}

function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const i = aprobados.indexOf(ramo.id);
    if (i > -1) aprobados.splice(i, 1);
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos();
}

window.addEventListener('DOMContentLoaded', () => {
  const aprobados = obtenerAprobados();
  document.querySelectorAll('.ramo').forEach(r => {
    if (aprobados.includes(r.id)) r.classList.add('aprobado');
    r.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});
