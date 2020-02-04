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