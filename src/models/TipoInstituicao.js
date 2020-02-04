const mongoose = require('mongoose');


const TipoInstituicaoSchema = new mongoose.Schema({
    nome : String,
    descricao : String,
});

module.exports = mongoose.model('TipoInstituicao', TipoInstituicaoSchema);