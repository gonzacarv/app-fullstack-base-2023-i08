var M;

class Main implements EventListenerObject, HttpResponse {
  framework: Framework = new Framework();

  manejarRespueta(respueta: string) {
    var lista: Array<Device> = JSON.parse(respueta);

    var ulDisp = document.getElementById("listaDisp");
    for (var disp of lista) {
      var item: string = `<li class="collection-item avatar">`;
      if (disp.type == 0) {
        item += '<img src="static/images/light.png" alt = "" class="circle" >';
      } else if (disp.type == 1) {
        item += '<img src="static/images/fan.png" alt = "" class="circle" >';
      } else if (disp.type == 2) {
        item += '<img src="static/images/switch.png" alt = "" class="circle" >';
      }
      item += `<span class="TituloDevice">${disp.name}</span>
                          <p>
                          ${disp.description}
                          </p>
                          <a href="#!" class="secondary-content">
                          <div class="switch">
                          <label>
                            Off
                            `;

      if (disp.state) {
        item += `<input type="checkbox" checked id="ck_${disp.id}">`;
      } else {
        item += `<input type="checkbox" id="ck_${disp.id}" >`;
      }

      item += `
                                                <span class="lever"></span>
                                                On
                                              </label>
                                            </div>`;
      if (disp.type == 0 || disp.type == 1) {
        item += `<input type="range" value="${disp.intensidad}" id="Range_${disp.id}" min="0" max="100" />`;
      } else {
        item += `<input type="range" hidden value="${disp.intensidad}" id="Range_${disp.id}" min="0" max="100" />`;
      }

      item += `
                                          </a>
                                        </li>`;

      ulDisp.innerHTML += item;
    }

    for (var disp of lista) {
      var checkPrender = document.getElementById("ck_" + disp.id);
      checkPrender.addEventListener("click", this);
    }

    for (var disp of lista) {
      var checkIntensidad = document.getElementById("Range_" + disp.id);
      checkIntensidad.addEventListener("click", this);
    }
  }

  obtenerDispositivo() {
    this.framework.ListarDispositivos("GET","http://localhost:8000/devices",this);
  }

  cambiarDispositivo(devId: number, state: number) {
    let newDevice = {state: state};
    this.framework.CambiarDevice("PUT", `http://localhost:8000/device/state/${devId}`, this, newDevice);
  }




  handleEvent(event) {
    var elemento = <HTMLInputElement>event.target;
    console.log(elemento);
    if (event.target.id == "btnListar") {
      this.obtenerDispositivo();
      //for (var user of this.users) {

      //TODO cambiar ESTO por mostrar estos datos separados por "-"
      //en un parrafo "etiqueta de tipo <p>"

      //}
    } else if (event.target.id == "btnLogin") {
      var iUser = <HTMLInputElement>document.getElementById("iUser");
      var iPass = <HTMLInputElement>document.getElementById("iPass");
      var username: string = iUser.value;
      var password: string = iPass.value;

      if (username.length > 3 && password.length > 3) {
        //iriamos al servidor a consultar si el usuario y la cotraseña son correctas
        var parrafo = document.getElementById("parrafo");
        parrafo.innerHTML = "Espere...";
      } else {
        alert("el nombre de usuario es invalido");
      }
    } else if (elemento.id.startsWith("ck_")) {
      //Ir al backend y aviasrle que el elemento cambio de estado
      //TODO armar un objeto json con la clave id y status y llamar al metodo ejecutarBackend
      this.cambiarDispositivo(Number(elemento.id),Number(elemento.checked));
      console.log("El elemento " + elemento.id + " cambia de estado a =" + elemento.checked);
    } else if (elemento.id.startsWith("Range_")) {
      //Ir al backend y aviasrle que el elemento cambio de estado
      //TODO armar un objeto json con la clave id y status y llamar al metodo ejecutarBackend

      console.log(
        "El elemento " +
          elemento.id +
          " cambia de estado a =" +
          elemento.value
      );
    } else if (event.target.id == "btnAgregar") {




    } else {
      //TODO cambiar esto, recuperadon de un input de tipo text
      //el nombre  de usuario y el nombre de la persona
      // validando que no sean vacios
      console.log("yendo al back");
      this.framework.ListarDispositivos(
        "POST",
        "http://localhost:8000/device",
        this,
        {}
      );
    }
  }
}

window.addEventListener("load", () => {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {});
  var elemsC = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elemsC, { autoClose: true });

  var main: Main = new Main();
  var btnListar: HTMLElement = document.getElementById("btnListar");
  btnListar.addEventListener("click", main);

  var btnAgregar: HTMLElement = document.getElementById("btnAgregar");
  btnAgregar.addEventListener("click", main);

  var btnLogin = document.getElementById("btnLogin");
  btnLogin.addEventListener("click", main);
});
