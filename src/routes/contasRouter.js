const { Router } = require('express');
const router = Router();
const bankController = require('./../controllers/contasController');

router.get('/contas', bankController.getContas);
router.post('/contas', bankController.createConta);
router.put('/contas/:numeroConta/usuario', bankController.updateConta);
router.delete('/contas/:numeroConta', bankController.deleteConta);

module.exports = router;