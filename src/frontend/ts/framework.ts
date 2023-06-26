class Framework{

  public ListarDispositivos(method:string,url:string,callback:HttpResponse,data?:any) {
    var xmlReq = new XMLHttpRequest();        
    xmlReq.onreadystatechange = () => {
        if (xmlReq.readyState == 4) {
          if (xmlReq.status == 200) {
            console.log("llego "+xmlReq.responseText)
              callback.manejarRespueta(xmlReq.responseText);
            } else {
                alert("Error al buscar los datos!");
            }
        }
    }
    xmlReq.open(method, url, true);
    if (data != undefined) {
      xmlReq.setRequestHeader("Content-Type", "application/json");
      xmlReq.send(JSON.stringify(data));
      
    } else {
      xmlReq.send();
    }
    
//
  }

  // Method to change a device state or edit device properties
  public CambiarDevice(method: string, url: string, responseHandler:HttpResponse, data: any) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
            console.log(xmlHttp.responseText); 
            } else {
                alert("ERROR en la consulta");
            }
          }
        }
    xmlHttp.open(method, url, true);
    if (data != undefined) {
      xmlHttp.setRequestHeader("Content-Type", "application/json");  
      xmlHttp.send(JSON.stringify(data));
    }
  }



}