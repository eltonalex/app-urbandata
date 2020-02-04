
const { Router } = require('express');
//para utilização de api´s externas
const axios = require('axios');
const User = require('./models/User');
const Autor = require('./models/Autor');
const Thesaurus = require('./models/Thesaurus');
const Publicacao = require('./models/Publicacao');
const PublicacaoLivro = require('./models/PublicacaoLivro');
const Instituicao = require('./models/Instituicao');
const TipoInstituicao = require('./models/TipoInstituicao');



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

    

})

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

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

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

 /*

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:

//Query Params: exemplo: http://localhost:3333/users?search=Elton | Acessando: request.query (Identifica filtros, ordenação, paginação, ...)
//Route Params: exemplo: http://localhost:3333/users/1 | Acessando: request.params (Identifica um recurso na alteração ou remoção)
//Body: Params: exemplo: http://localhost:3333/users | Acessando: request.body (Dados para criação ou alteração de um registro)

routes.get('/',(request, response) =>{

    //return response.send('Olá mundo');
    return response.json({message:'Olá mundo Novo!'});

})

//Devs
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

//search
routes.get('/search', SearchController.index)


//Users
routes.get('/users',(request, response) =>{

    //return response.send('Olá mundo');
    console.log(request.query);
    return response.json({message:'Olá Usuário!'});

})

routes.post('/users/',(request, response) =>{

    console.log(request.body);
    return response.json({message:'Enviando dados do Usuário!'});

})

routes.put('/users/:id',(request, response) =>{

    //return response.send('Olá mundo');
    console.log(request.body);
    return response.json({message:'Alterando o Usuário!'});

})

routes.put('/users/:id',(request, response) =>{

    //return response.send('Olá mundo');
    console.log(request.params);
    return response.json({message:'Alterando o Usuário!'});

})

routes.delete('/users/:id',(request, response) =>{

    //return response.send('Olá mundo');
    console.log(request.params);
    return response.json({message:'Excluindo o Usuário!'});

})

 */