const { Router } = require('express');

const User = require('./models/User');

const routes = Router();


routes.post('/user/', async (request, response) =>{

    const { nome , email, senha , tipoUsuario="P"} = request.body;

    try {
        //A - Administrador, E - Editor, P - Pesquisador
        
        if( await User.findOne({ email }))
            return response.send(400).send({ error: 'Usuário já existe.' });        
    
            const user = await User.create({
                nome,
                email,
                senha,
                tipoUsuario
        });
    
        return response.json(user);

    } catch (error) {
        return response.status(400).send({error:'Não foi possível realizar o registro!'});
    }
    
});


module.exports = app => app.use('/auth', routes);