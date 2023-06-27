//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================


// Recepcion de todos los dispositivos y estados


app.get('/devices/', function(req, res, next) {

    utils.query("select * from Dispositivos",function(err,rsp,fields){
        if(err!=null)
        console.log(rsp) //mostramos la respuesta en la consola
        res.send(JSON.stringify(rsp)).status(200);
    });
    
    //res.send(JSON.stringify(devices)).status(200);
});


app.post('/cambioestado/',function(req,res){
    //console.log("            #############                El valor de req.body.id: "+req.body.id+" El valor de req.body.value:"+req.body.value) //mostramos la respuesta en la consola
    if (req.body.value == "on") console.log("                ############                      Todo bien con el ON")
    if (req.body.value == "off") console.log("                ############                      Todo bien con el OFF")
    var stado = req.body.value.replace("on", "1");
    var stado = req.body.value.replace("off", "0");
    //console.log("             #############                El valor de req.body.id: "+req.body.id+" El valor de stado:"+stado) //mostramos la respuesta en la consola
     utils.query("UPDATE Dispositivos SET state=" + stado + " WHERE id=" + req.body.id, function(err, rsp, fields) {
     console.log(err)
        if (err) {
        res.status(409);
        res.send("error");
      } else {
        //res.status(200);
        //res.send();
        res.send(JSON.stringify(rsp)).status(200);
      }
    }); 
});



app.post('/cambiointensidad/',function(req,res){
     //console.log("El valor de req.body.id: "+req.body.id+" El valor de req.body.value:"+req.body.value) //mostramos la respuesta en la consola
     utils.query("UPDATE Dispositivos SET intensidad=" + req.body.value + " WHERE id=" + req.body.id, function(err, rsp, fields) {
     console.log(err)
        if (err) {
        res.status(409);
        res.send("error");
      } else {
        //res.status(200);
        //res.send();
        res.send(JSON.stringify(rsp)).status(200);
      }
    }); 
});



app.post('/eliminar/',function(req,res){
     console.log("Se elimino el registro con ID: "+req.body.id) //mostramos la respuesta en la consola
     utils.query("DELETE FROM Dispositivos WHERE id=" + req.body.id, function(err, rsp, fields) {
     console.log(err)
        if (err) {
        res.status(409);
        res.send("error");
      } else {
        //res.status(200);
        //res.send();
        res.send(JSON.stringify(rsp)).status(200);
      }
    }); 
});



















app.post('/device/',function(req,res){
    //console.log("llego = "+req.body.id);
    if(req.body.texto==undefined || req.body.texto==null || req.body.texto.length<4){
        res.status(409);
        res.send("el texto no es valido");
    }else{
        
        res.status(200)
        res.send("Todo ok");
    }
    
});

// Cambiar estado
app.put('/device/state/:id', function(req, res, next) {
    utils.query('UPDATE `Dispositivos` SET `state` = ? WHERE `id` = ?', 
    [req.body.state, req.params.id], function(err, response, field) {
        console.log("OK al cambiar de estado del ID: "+req.body.id+" ;con el valor: "+req.params.id);
        if (err) {
            res.send(err).status(400);
            console.log("Ocurrio un error al cambiar estado");
            return;
        }
    res.send({'changedRows': response.changedRows}).status(200);
    });
});




app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
