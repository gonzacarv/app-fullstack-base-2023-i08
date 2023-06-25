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
app.post('/device/',function(req,res){
    console.log("llego = "+req.body.id);
    if(req.body.texto==undefined || req.body.texto==null || req.body.texto.length<4){
        res.status(409);
        res.send("el texto no es valido");
    }else{
        
        res.status(200)
        res.send("Todo ok");
    }
    
});
app.get('/pepe/', function(req,res) {
    utils.query("select * from Dispositivos",function(err,rsp,fields){
        if(err!=null)
        console.log(rsp)
        res.send(JSON.stringify(rsp)).status(200);
    });
  
});
app.get('/devices/', function(req, res, next) {

    utils.query("select * from Dispositivos",function(err,rsp,fields){
        if(err!=null)
        console.log(rsp)
        res.send(JSON.stringify(rsp)).status(200);
    });
    
    //res.send(JSON.stringify(devices)).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
