const PapelModel = require("../models/papel");

module.exports = {
  getId: async (req, res) => {
    await PapelModel.findById(req.body.id, (err, papel) => {
      if (err || !papel) res.json(false);
      res.json(papel);
    });
  },
  get: async (req, res) => {
    let papel = req.params.papel.toUpperCase();
    console.log(papel);
    await PapelModel.find({ nome: papel }, (err, papel) => {
      if (err) res.json(false);
      res.json(papel);
    });
  },
  listar: async (req, res) => {
    await PapelModel.find({}, (err, papeis) => {
      if (err) res.json([{ err }]);

      res.json(papeis);
    });
  },
  cadastrar: async papel => {
    //    let papel = req.body.papel ? req.body.papel : req.body;
    console.log("+--| PAPEL");
    console.log(papel);
    let resultado = await PapelModel(papel).save();
    //console.log(resultado);
  },
  alterar: async papel => {
    //    let papel = req.body.papel ? req.body.papel : req.body;
    let alterar = await PapelModel.updateOne(
      { nome: papel.nome },
      {
        nome: papel.nome,
        radical: papel.radical,
        $push: { detalhes: papel.detalhes }
      }
    ).catch(e => {
      console.log(e);
    });
    if (alterar.nModified == 0) {
      PapelModel(papel).save();
    }
  },
  alterarPor: async (filtro, papel) => {
    // let papel = req.body.papel ? req.body.papel : req.body;
    await PapelModel.updateOne({ _id: papel._id }, papel, (err, Papel) => {
      if (err) {
        res.status(201).send({
          success: false
        });
      }
      res.status(201).send({
        success: true
      });
    });
  },
  remover: async (req, res, next) => {
    let id = req.params.id;
    await PapelModel.deleteOne({ _id: id }, err => {
      if (err) {
        res.status(201).json(false);
      }
      res.status(201).json(true);
    });
  },
  atualizarFundamentus: async (req, res, next) => {
    let url = `https://www.fundamentus.com.br/detalhes.php?papel=AMAR3`;

    request(url, (error, response, html) => {
      let data = new Date();
      var $ = cheerio.load(html);
      let empresas = [];
      $("table#resultado tbody tr").each((i, elem) => {
        let dados = [];
        let td = $(elem)
          .find("td")
          .each((ii, e) => {
            dados.push($(e).text());
          });
        let papel = {
          nome: dados[0],
          radical: dados[0].slice(0, 4),
          detalhes: [
            {
              cotacao: dados[1],
              PL: dados[2],
              PVP: dados[3],
              PSR: dados[4],
              divYield: dados[5],
              PAtivo: dados[6],
              PCapGiro: dados[7],
              PEbit: dados[8],
              PAtivCircLiq: dados[9],
              EVBIT: dados[10],
              EVBITDA: dados[11],
              MrgEbit: dados[12],
              MrgLiq: dados[13],
              LiqCorr: dados[14],
              ROIC: dados[15],
              ROE: dados[16],
              Liq2Meses: dados[17],
              PatrimLiq: dados[18],
              divBrutPatrim: dados[19],
              CrescRec5a: dados[20]
            }
          ]
        };
        empresas.push(papel);
      });
      empresas = removeDuplicateUsingSet(empresas);

      for (i = 0; i < empresas.length; i++) {
        Papel.alterar(empresas[i]);
      }
      res.json(empresas);
    });
  }
};
