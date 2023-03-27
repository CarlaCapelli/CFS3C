let btnAgregar = document.querySelector('#btnAgregar');
btnAgregar.addEventListener('click', agregar);
let btnDuracion = document.querySelector('#btnDuracion');
btnDuracion.addEventListener('click', duracion);

let pistas = [];
function agregar() {
  console.log('Función Agregar');
  let identificador = parseInt(document.querySelector('#identificador').value);
  let titulo = document.querySelector('#titulo').value;
  let duracion = parseInt(document.querySelector('#duracion').value);
  let interprete = document.querySelector('#interprete').value;
  let renglon = {
    identificador: identificador,
    titulo: titulo,
    duracion: duracion,
    interprete: interprete,
  };
  if (agregarSRV(renglon)) {
    pistas.push(renglon);
    mostrarPistas();
  }
}

async function agregarSRV(datos) {
  let respuesta = await fetch('/pista', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return (await respuesta.text()) == 'ok';
}
function duracion() {
  console.log('Función Duración');
  let total = 0;
  for (let i = 0; i < pistas.length; i++) {
    total += pistas[i].duracion;
  }
  let max = pistas[0].duracion;
  for (let r of pistas) {
    if (max < r.duracion) max = r.duracion;
  }
  document.querySelector('#total').innerHTML = `
        <p>Duración Total: ${total}</p>
        <p>Duración Máxima: ${max}</p>
        `;
}
function mostrarPistas() {
  console.log(pistas);
  let html = '';
  for (let r of pistas) {
    html += `
            <tr>
            <td><input type="text" value="${r.identificador}" id="ident${r.identificador}"</td>
            <td><input type="text" value="${r.titulo}" id="titulo${r.identificador}"</td>
            <td><input type"”text" value="${r.duracion}" id="duraci${r.identificador}"</td>
            <td><input type="text" value="${r.interprete}" id="interp${r.identificador}"</td>
            <td><button class="btnUpdPista btn btn-primary " ident="${r.identificador}">Actualizar</button></td>
            <td><button class="btnDelPista btn btn-danger px-4" identificador="${r.identificador}">Borrar</button></td>
            </tr>
            `;
  }
  document.querySelector('#tblPistas').innerHTML = html;
  let botonesBorrar = document.querySelectorAll('.btnDelPista');
  botonesBorrar.forEach((e) => {
    e.addEventListener('click', btnBorrarClick);
  });
  let botonesActualizar = document.querySelectorAll('.btnUpdPista');
  botonesActualizar.forEach((e) => {
    e.addEventListener('click', btnActualizarClick);
  });
}

async function load() {
  let container = document.querySelector('#status');
  container.innerHTML =  '<div class="d-flex justify-content-center my-3"><div class="spinner-border" role="status"></div></div>';
  try {
    let response = await fetch('/pista');
    if (response.ok) {
      let t = await response.json();
      pistas = t;

      await new Promise((resolve, reject) => setTimeout(resolve, 3000));
      mostrarPistas();
      container.innerHTML =  '';
    } else {
      container.innerHTML = '<h1>404 Error - Failed URL!</h1>';
    }
  } catch (response) {
    container.innerHTML = '<h1>500 conection error</h1>';
  }
}
async function btnBorrarClick() {
  let id = this.getAttribute('identificador');
  let respuesta = await fetch(`/pista/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  load();
}
async function btnActualizarClick() {
  let id = this.getAttribute('ident');
  console.log(document.getElementById(`ident${id}`));
  console.log(id);
  let renglon = {
    identificador: document.getElementById(`ident${id}`).value,
    titulo: document.getElementById(`titulo${id}`).value,
    duracion: document.getElementById(`duraci${id}`).value,
    interprete: document.getElementById(`interp${id}`).value,
  };
  let respuesta = await fetch(`/pista/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(renglon),
  });
  load();
}
load();
