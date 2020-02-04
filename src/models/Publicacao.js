const mongoose = require('mongoose');

const PublicacaoSchema = new mongoose.Schema({

    doi :  {
        type:String,
        required: true,
    },
    url :  {
        type:String,
        required: true,
    },
    titulo :  {
        type:String,
        required: true,
    },
    orcid :  {
        type:String,
        required: true,
    },
    dataDefesa :  {
        type:String,
        required: true,
    },
    orientador :  {
        type:String,
        required: true,
    },
    lattesOrientador :  {
        type:String,
        required: true,
    },
    emailOrientador :  {
        type:String,
        required: true,
    },
    coorientador :  {
        type:String,
        required: true,
    },
    lattesCoorientador :  {
        type:String,
        required: true,
    },
    emailCoorientador :  {
        type:String,
        required: true,
    },
	instituicao:  {
        type:String,
        required: true,
    },
	sigla : {
        type:String,
        required: true,
    },
    descricaoInstituicao : {
        type:String,
        required: true,
    },
    pais : {
        type:String,
        required: true,
    },
    idioma : {
        type:String,
        required: true,
    },
    programa : {
        type:String,
        required: true,
    },   
    agenciaFomento : {
        type:String,
        required: true,
    },
    resumo : {
        type:String,
        required: true,
    },
    abstract : {
        type:String,
        required: true,
    },
    palavrasChaves : [String],
    areaTematica : [String],
    referenciaEspacial : [String],
    referenciaTemporal : [String],
    createdAt : {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('PublicacaoSchema', PublicacaoSchema);