const { Router } = require('express');

const Thesaurus = require('./models/Thesaurus');

const routes = Router();

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

    const { termo, conceitos, sinonimos="sinônimo", antonimos="Antônimo"} = request.body;

    await Thesaurus.create({
        termo, 
        conceitos,
        sinonimos, 
        antonimos,  
    }, function(err, thesaurus) {
        if (!err){ 
            console.log(thesaurus);
            return response.json(thesaurus);
            process.exit();
        } else {throw err;}
    });
 });