const mongoose = require('mongoose');

const PublicacaoLivroSchema = new mongoose.Schema({

    tipoRegistro : String,
	registro : String,
	titulo : String,
	autor: String,
	imprenta :String,
    ano : Number,
    edicao : String,
    paginas : Number,
    serie : String,
    idioma : String,
    assunto : String,
    areaTematica : [String],
    referenciaEspacial : [String],
    referenciaTemporal : [String],
    createdAt : {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('PublicacaoLivro', PublicacaoLivroSchema);