const { Router } = require('express');

const Autor = require('./models/Autor');

const routes = Router();

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

routes.put('/autor/:id', async (request, response) => { 
    
    const autor = await Autor.updateOne({"_id":request.param.id}, request.body, (err) => {
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

routes.delete('/autor', async (request, response) => { 
   
    Autor.destroy({
        where:{"_id":request.param.id}
    }).then(function(){
        response.send("Pagamento apagado com sucesso!");
    }).catch(function(){
        response.send("Pagamento não foi apagado com sucesso!")
    });

});
