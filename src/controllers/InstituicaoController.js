const { Router } = require('express');

const Instituicao = require('./models/Instituicao');
const TipoInstituicao = require('./models/TipoInstituicao');


const routes = Router();

 routes.get('/instituicao', async (request, response) => {
    await Instituicao.find({}, function(err, instituicao) {
        if (!err){ 
            console.log(instituicao);
            return response.json(instituicao);
            process.exit();
        } else {throw err;}
    });
 });

 routes.post('/instituicao', async (request, response) => {

    const { nome, pais, descricao, tipoInstituicao } = request.body;

    await Instituicao.create({
        nome, 
        pais,
        descricao, 
        tipoInstituicao,
    }, function(err, instituicao) {
        if (!err){ 
            console.log(instituicao);
            return response.json(instituicao);
            process.exit();
        } else {throw err;}
    });
 });