"use scritc";

var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var Schema = mongoose.Schema;

var PapelSchema = new Schema({
  nome: { type: String, unique: true },
  tipo: String,
  empresa: String,
  setor: String,
  subSetor: String,
  radical: String,
  resumo: String,
  logo: String,
  detalhes: [
    {
      cotacao: String,
      PL: String,
      PVP: String,
      PSR: String,
      divYield: String,
      PAtivo: String,
      PCapGiro: String,
      PEbit: String,
      PAtivCircLiq: String,
      EVBIT: String,
      EVBITDA: String,
      MrgEbit: String,
      MrgLiq: String,
      LiqCorr: String,
      ROIC: String,
      ROE: String,
      Liq2Meses: String,
      PatrimLiq: String,
      divBrutPatrim: String,
      CrescRec5a: String,
      dataConsulta: {
        type: Date,
        default: Date.now
      }
    }
  ],
  atualizado: {
    type: Date,
    default: Date.now
  },
  criado: {
    type: Date,
    default: Date.now
  }
});

PapelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("papeis", PapelSchema);

PapelSchema.pre("update", function() {
  this.update({}, { $set: { atualizado: new Date() } });
});
