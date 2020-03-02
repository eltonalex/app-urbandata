const mongoose = require('mongoose');

const PesquisaSchema = new mongoose.Schema({
    
        AnoBase : String,
        IdPrograma : String,
        Regiao : String,
        Uf : String,
        IdTese : String,
        SiglaIes : String,
        NomeIes : String,
        NomePrograma : String,
        GrandeAreaCodigo : String,
        GrandeAreaDescricao : String,
        AreasConhecimentoCodigo : String,
        AreasConhecimento : String,
        AreaAvaliacao : String,
        DocumentoDiscente : String,
        Autor : String,
        EmailAutor : String,
        TituloTese : String,
        Nivel : String,
        DataDefesa : String,
        PalavrasChave : String,
        Volume : String,
        NumeroPaginas : Number,
        BibliotecaDepositaria : String,
        Idioma : String,
        ResumoTese : String,
        IdLinhaPesquisa : String,
        URLTextoCompleto : String,
        LinhaPesquisa : String,
      
});

module.exports = mongoose.model('Pesquisa', PesquisaSchema);  

  