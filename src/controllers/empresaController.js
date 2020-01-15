const EmpresaModel = require("../models/empresa");

module.exports = {
  getId: async (req, res) => {
    await EmpresaModel.findById(req.body.id, (err, empresa) => {
      if (err || !empresa) res.json(false);
      res.json(empresa);
    });
  },
  listar: async (req, res) => {
    await EmpresaModel.find({},  (err, empresas) => {
      if (err) res.json([{err}]);

      res.json(empresas);
    });
  },
  cadastrar: async (req, res) => {
    let empresa = req.body.empresa ? req.body.empresa : req.body;
    console.log("+--| EMPRESA");
    console.log(empresa);
    let resultado = await EmpresaModel(empresa).save();
    console.log(resultado);
  },
  alterar: async (req, res) => {
    let empresa = req.body.empresa ? req.body.empresa : req.body;
    await EmpresaModel.updateOne(
      { _id: empresa._id },
      empresa,
      (err, Empresa) => {
        if (err) {
          res.status(201).send({
            success: false
          });
        }
        res.status(201).send({
          success: true
        });
      }
    );
  },
  alterarPor: async (filtro, empresa) => {
    // let empresa = req.body.empresa ? req.body.empresa : req.body;
    await EmpresaModel.updateOne(
      { _id: empresa._id },
      empresa,
      (err, Empresa) => {
        if (err) {
          res.status(201).send({
            success: false
          });
        }
        res.status(201).send({
          success: true
        });
      }
    );
  },
  remover: async (req, res, next) => {
    let id = req.params.id;
    await EmpresaModel.deleteOne({ _id: id }, err => {
      if (err) {
        res.status(201).json(false);
      }
      res.status(201).json(true);
    });
  }
};
