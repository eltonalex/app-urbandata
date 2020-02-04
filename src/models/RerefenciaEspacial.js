const mongoose = require('mongoose');

const ReferenciaEspacialSchema = new mongoose.Schema({
    nome : String,
    email :String,
    orcid : String,
    lattes : String,
    github_username : String,
    dataNascimento : String,
    paisNascimento : String,
    Sexo : String,
    palavrasChaves : [String],
    createdAt : {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('ReferenciaEspacial', ReferenciaEspacialSchema);