"use scritc";

var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var Schema = mongoose.Schema;

var EmpresaSchema = new Schema({
  nome: { type: String, unique: true },
  setor: String,
  subSetor: String,
  radical: String,
  resumo:String,
  logo:String,
  papaeis: [{ papel: String, tipo: String, cotacao: String }],
  atualizado: {
    type: Date,
    default: Date.now
  },
  criado: {
    type: Date,
    default: Date.now
  }
});

EmpresaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("empresa", EmpresaSchema);

EmpresaSchema.pre("update", function() {
  this.update({}, { $set: { atualizado: new Date() } });
});
