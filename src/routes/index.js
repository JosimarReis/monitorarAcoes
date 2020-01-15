const express = require('express');
const router = express.Router();
const empresasb3 = require("./../scrap/empresasb3");


router.get("/", empresasb3.unirTodos);
router.get("/fundamentus", empresasb3.colherFundamentus);
router.get("/fe", empresasb3.colherFundamentei);
router.get("/infomoney", empresasb3.colherEmpresas);

module.exports = app => app.use('/', router) ;
