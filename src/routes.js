
const { Router } = require('express');
//para utilização de api´s externas
const Mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/User');
const Autor = require('./models/Autor');
const Thesaurus = require('./models/Thesaurus');
const Publicacao = require('./models/Publicacao');
const PublicacaoLivro = require('./models/PublicacaoLivro');
const Instituicao = require('./models/Instituicao');
const TipoInstituicao = require('./models/TipoInstituicao');
const Pesquisa = require('./models/Pesquisa');



const routes = Router();

routes.get('/usuario', async (request, response) => {
    
    await User.find({}, function(err, user) {
        if (!err){ 
            console.log(user);
            return response.json(user);
            process.exit();
        } else {throw err;}
    });
 });

routes.post('/usuario', async (request, response) =>{

    //A - Administrador, E - Editor, P - Pesquisador

    const { nome , email , senha , tipoUsuario="P"} = request.body;
    
    try {

        if(await User.findOne({email}))
            return response.status(400).send({error:'Usuário já existe.'});

        const user = await User.create({
            nome,
            email,
            senha,
            tipoUsuario
        });

        user.senha = undefined;

        return response.json(user);
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar o cadastro.'});

    }

    

});

routes.get('/pesquisa', async (request, response) =>{

    try {

        Pesquisa.find({}, function (err, pesquisa) {
            response.status(200).json(pesquisa);
        });

        //const pesquisa = await Pesquisa.find({});
        //return response.json(pesquisa);
             
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar a pesquisa.'});

    }

});

routes.get('/pesquisa/area-conhecimento/', async (request, response) =>{

    const {AreasConhecimento} = request.body;
    
    try {

        const pesquisa = await Pesquisa.findOne({AreasConhecimento});
        return response.json(pesquisa);
        
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar a pesquisa.'});

    }

    

});

routes.get('/autor', async (request, response) => {
    await Autor.find({}, function(err, autor) {
        if (!err){ 
            console.log(autor);
            return response.json(autor);
            process.exit();
        } else {throw err;}
    });
 });

 routes.post('/autor', async (request, response) => {
    const { nome, email, orcid, lattes, github_username, dataNascimento, paisNascimento, sexo, palavrasChaves} = request.body;

    //const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    const palavrasChavesArray = palavrasChaves.split(',').map(palavraChave=> palavraChave.trim());

    await Autor.create({
        nome, 
        email, 
        orcid, 
        lattes, 
        github_username, 
        dataNascimento,
        paisNascimento, 
        sexo,
        palavrasChaves:palavrasChavesArray,
    }, function(err, autor) {
        if (!err){ 
            console.log(autor);
            return response.json(autor);
            process.exit();
        } else {throw err;}
    });

 });

 routes.put('/autor/:id', async (request, response) => { 
    
    let id =  request.params.id;

    const autor = await Autor.updateOne({ "_id": `${id}` }, request.body, (err) => {
        if(err) return response.status(400).json({
            error:true,
            message:"Não foi possível realizar a edição do registro!"
        });

        return response.json({
            error:false,
            message:"Registro editado com sucesso!"
        });
    });

    console.log(autor);

 });

 routes.delete('/autor/:id', async (request, response) => { 
   
    let id =  request.params.id;
    console.log(id);
    const query = { "_id": `${id}` };

    await Autor.deleteOne(query)
    .then(function(){
        response.send("Pagamento apagado com sucesso!");
    }).catch(function(){
        response.send("Pagamento não foi apagado com sucesso!")
    });

});

 routes.get('/thesaurus', async (request, response) => {
    await Thesaurus.find({}, function(err, thesaurus) {
        if (!err){ 
            console.log(thesaurus);
            return response.json(thesaurus);
            process.exit();
        } else {throw err;}
    });
 });

 routes.post('/thesaurus', async (request, response) => {  

    const { termo, sinonimos, antonimos, conceitos} = request.body;

    await Thesaurus.create({
        termo, 
        sinonimos, 
        antonimos, 
        conceitos, 
    }, function(err, thesaurus) {
        if (!err){ 
            console.log(thesaurus);
            return response.json(thesaurus);
            process.exit();
        } else {throw err;}
    });
 });

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

 routes.get('/instituicao/tipo', async (request, response) => {
    await InstiTipoInstituicao.find({}, function(err, instituicoes) {
        if (!err){ 
            console.log(instituicoes);
            return response.json(instituicoes);
            process.exit();
        } else {throw err;}
    });
 });

 routes.post('/instituicao/tipo', async (request, response) => {

    const { nome, email, orcid, lattes, github_username, dataNascimento, paisNascimento, sexo, palavrasChaves} = request.body;

    const palavrasChavesArray = palavrasChaves.split(',').map(palavraChave=> palavraChave.trim());

    await TipoInstituicao.create({
        nome, 
        email, 
        orcid, 
        lattes, 
        github_username, 
        dataNascimento,
        paisNascimento, 
        sexo,
        palavrasChaves:palavrasChavesArray,
    }, function(err, instituicao) {
        if (!err){ 
            console.log(instituicao);
            return response.json(instituicao);
            process.exit();
        } else {throw err;}
    });
 });

 routes.get('/publicacao/livro', async (request, response) => {
    await PublicacaoLivro.find({}, function(err, publicacaoLivro) {
        if (!err){ 
            console.log(publicacaoLivro);
            return response.json(publicacaoLivro);
            process.exit();
        } else {throw err;}
    });
 });

 routes.post('/publicacao/livro', async (request, response) => {

    const { 
        tipoRegistro, 
        registro, 
        titulo,
        autor, 
        imprenta, 
        ano, 
        edicao, 
        paginas, 
        serie, 
        idioma, 
        assunto, 
        areaTematica,
        referenciaEspacial, 
        referenciaTemporal} = request.body;

    const areaTematicaArray = areaTematica.split(',').map(areaTematica => areaTematica.trim());
    const referenciaEspacialArray = referenciaEspacial.split(',').map(referenciaEspacial => referenciaEspacial.trim());
    const referenciaTemporalArray = referenciaTemporal.split(',').map(referenciaTemporal => referenciaTemporal.trim());
    
    await PublicacaoLivro.create({
        tipoRegistro,
        registro,
        titulo,
        autor,
        imprenta,
        ano,
        edicao,
        paginas,
        serie,
        idioma,
        assunto,
        areaTematica : areaTematicaArray,
        referenciaEspacial : referenciaEspacialArray,
        referenciaTemporal : referenciaTemporalArray,
    }, function(err, publicacaoLivro) {
        if (!err){ 
            console.log(publicacaoLivro);
            return response.json(publicacaoLivro);
            process.exit();
        } else {throw err;}
    });
 });

 routes.get('/publicacao', async (request, response) => {
    await Publicacao.find({}, function(err, publicacao) {
        if (!err){ 
            console.log(publicacao);
            return response.json(publicacao);
            process.exit();
        } else {throw err;}
    });
 });

 routes.post('/publicacao', async (request, response) => {

    const { 
        doi, 
        url, 
        titulo, 
        orcid, 
        dataDefesa, 
        orientador, 
        lattesOrientador, 
        emailOrientador, 
        coorientador, 
        lattesCoorientador, 
        emailCoorientador, 
        instituicao, 
        sigla, 
        descricaoInstituicao,  
        pais,
        idioma,
        programa,
        agenciaFomento,
        resumo,
        abstract,
        palavrasChaves,
        areaTematica,
        referenciaEspacial, 
        referenciaTemporal
    } = request.body;

    const palavrasChavesArray = palavrasChaves.split(',').map(palavraChave=> palavraChave.trim());
    const areaTematicaArray = areaTematica.split(',').map(areaTematica => areaTematica.trim());
    const referenciaEspacialArray = referenciaEspacial.split(',').map(referenciaEspacial => referenciaEspacial.trim());
    const referenciaTemporalArray = referenciaTemporal.split(',').map(referenciaTemporal => referenciaTemporal.trim());
   
    await Publicacao.create({
        doi,
        url,
        titulo,
        orcid,
        dataDefesa,
        orientador,
        lattesOrientador,
        emailOrientador,
        coorientador,
        lattesCoorientador,
        emailCoorientador,
        instituicao,
        sigla,
        descricaoInstituicao,
        pais,
        idioma,
        programa,
        agenciaFomento,
        resumo,
        abstract,
        palavrasChaves : palavrasChavesArray,
        areaTematica : areaTematicaArray,
        referenciaEspacial : referenciaEspacialArray,
        referenciaTemporal : referenciaTemporalArray,
    }, function(err, publicacao) {
        if (!err){ 
            console.log(publicacao);
            return response.json(publicacao);
            process.exit();
        } else {throw err;}
    });
 });

 module.exports = routes;