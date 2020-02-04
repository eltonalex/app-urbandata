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

routes.put('/autor', async (request, response) => { 

 });

routes.delete('/autor', async (request, response) => { 

});
