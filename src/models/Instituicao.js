const mongoose = require('mongoose');

const InstituicaoSchema = new mongoose.Schema({
    nome : String,
    pais :String,
    descricao : String,
    tipoInstituicao : String,
    createdAt : {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('Instituicao', InstituicaoSchema);