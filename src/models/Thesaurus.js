const mongoose = require('mongoose');

const ThesaurusSchema = new mongoose.Schema({
    termo: String,
    conceitos: String,
	sinonimos: String,
	antonimos: String,
	createdAt : {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('Thesaurus', ThesaurusSchema);