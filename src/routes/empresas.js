const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController')
const path = require('path');
const fs = require('fs');
router.post('/', controller.cadastrar);
router.post('/get', controller.getId);
router.post('/alterar', controller.alterar);
router.delete('/:id', controller.remover);
router.post('/listar', controller.listar);
router.get('/', controller.listar);

module.exports = app => app.use('/api/empresas', router);