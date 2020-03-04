
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

routes.post('/pesquisa', async (request, response) =>{

    //A - Administrador, E - Editor, P - Pesquisador

    const { AnoBase, IdPrograma, Regiao, Uf, IdTese, SiglaIes, NomeIes,
        NomePrograma, GrandeAreaCodigo, GrandeAreaDescricao, AreasConhecimentoCodigo,
        AreasConhecimento, AreaAvaliacao, DocumentoDiscente, Autor, EmailAutor,
        TituloTese, Nivel, DataDefesa, PalavrasChave, Volume, NumeroPaginas,
        BibliotecaDepositaria, Idioma, ResumoTese, IdLinhaPesquisa, URLTextoCompleto,
        LinhaPesquisa} = request.body;
    
    try {

        const pesquisa = await Pesquisa.create({
            AnoBase, IdPrograma, Regiao, Uf, IdTese, SiglaIes, NomeIes,
            NomePrograma, GrandeAreaCodigo, GrandeAreaDescricao, AreasConhecimentoCodigo,
            AreasConhecimento, AreaAvaliacao, DocumentoDiscente, Autor, EmailAutor,
            TituloTese, Nivel, DataDefesa, PalavrasChave, Volume, NumeroPaginas,
            BibliotecaDepositaria, Idioma, ResumoTese, IdLinhaPesquisa, URLTextoCompleto,
            LinhaPesquisa
        });

        return response.json(pesquisa);
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar o cadastro.'});

    }

    

});

routes.get('/pesquisa', async (request, response) =>{

    const {AreasConhecimento, Regiao, ResumoTese} = request.query;
    console.log("Campos -> Área: "+AreasConhecimento+" - Região: "+Regiao+" - Resumo: "+ResumoTese);

    if (AreasConhecimento !== null || AreasConhecimento !== undefined || AreasConhecimento !== ''){
        
        pesquisa_0 = await Pesquisa.find( { AreasConhecimento } );
        console.log("-----------------AreasConhecimento------------------");
        console.log(pesquisa_0);
        return response.status(200).json(pesquisa_0);
    
    } 
    
    if (Regiao !== null || Regiao !== undefined || Regiao !== ''){
    
        pesquisa_1 = await Pesquisa.find( { Regiao } );
        console.log("-----------------Regiao------------------");
        console.log(pesquisa_1);
        return response.status(200).json(pesquisa_1);
    
    } 
    
    if (ResumoTese !== null || ResumoTese !== undefined || ResumoTese !== ''){
    
        const pesquisa_2 = await Pesquisa.find( {  ResumoTese : { $regex: '.*' + ResumoTese + '.*' } } );
        console.log("-----------------ResumoTese------------------");
        console.log(pesquisa_2);
        return response.status(200).json(pesquisa_2);
    
    } 
    
    
    const pesquisa = await Pesquisa.find( {} );
    console.log("-----------------GERAL------------------");
    console.log(pesquisa);
    return response.status(200).json(pesquisa);
    

    /*

    try {
        
        if (AreasConhecimento !== null || AreasConhecimento !== undefined || AreasConhecimento !== ''){
        
            pesquisa_0 = await Pesquisa.find( { AreasConhecimento } );
            console.log("-----------------AreasConhecimento------------------");
            console.log(pesquisa_0);
            return response.status(200).json(pesquisa_0);
        
        } else if (Regiao !== null || Regiao !== undefined || Regiao !== ''){
        
            pesquisa_1 = await Pesquisa.find( { Regiao } );
            console.log("-----------------Regiao------------------");
            console.log(pesquisa_1);
            return response.status(200).json(pesquisa_1);
        
        } else if (ResumoTese !== null || ResumoTese !== undefined || ResumoTese !== ''){
        
            const pesquisa_2 = await Pesquisa.find( {  ResumoTese : { $regex: '.*' + ResumoTese + '.*' } } );
            console.log("-----------------ResumoTese------------------");
            console.log(pesquisa_2);
            return response.status(200).json(pesquisa_2);
        
        } else {
        
            const pesquisa = await Pesquisa.find( {} );
            console.log("-----------------GERAL------------------");
            console.log(pesquisa);
            return response.status(200).json(pesquisa);
        }
        
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar a pesquisa.'});

    }
*/

});

routes.get('/pesquisa/e', async (request, response) =>{

    const {AreasConhecimento, Regiao, ResumoTese} = request.query;
    
    try {
        
        //const pesquisa = await Pesquisa.find( { $or: [ { AreasConhecimento }, { Regiao }, { ResumoTese : { $regex: '.*' + ResumoTese + '.*' } } ] } );

        const pesquisa = await Pesquisa.find( { $and: [ { AreasConhecimento }, { Regiao }, { ResumoTese : { $regex: '.*' + ResumoTese + '.*' } } ] } );

        return response.status(200).json(pesquisa);
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar a pesquisa.'});

    }

});


routes.get('/pesquisa/ou', async (request, response) =>{

    const {AreasConhecimento, Regiao, ResumoTese} = request.query;
    
    try {
        
        //const pesquisa = await Pesquisa.find( { $or: [ { AreasConhecimento }, { Regiao }, { ResumoTese : { $regex: '.*' + ResumoTese + '.*' } } ] } );

        const pesquisa = await Pesquisa.find( { $or: [ { AreasConhecimento }, { Regiao }, { ResumoTese : { $regex: '.*' + ResumoTese + '.*' } } ] } );

        return response.status(200).json(pesquisa);
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar a pesquisa.'});

    }

});

routes.get('/pesquisa/area-conhecimento/', async (request, response) =>{

    const {AreasConhecimento} = request.query;
    
    try {

        const pesquisa = await Pesquisa.find({AreasConhecimento});
        
        return response.status(200).json(pesquisa);
        
        
    } catch (error) {
        
        return response.status(400).send({error:'Não foi possível realizar a pesquisa.'});

    }

    

});

routes.post('/pesquisa/area-conhecimento/', async (request, response) =>{

    const {AreasConhecimento} = request.body;
    
    try {

        const pesquisa = await Pesquisa.find({AreasConhecimento});
        
        return response.status(200).json(pesquisa);
        
        
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