const { Router } = require('express');
const router = Router();
const bankController = require('./../controllers/transacoesController');

router.post('/transacoes/depositar', bankController.depositarConta);
router.post('/transacoes/sacar', bankController.sacarConta);
router.post('/transacoes/transferir', bankController.transferirConta);
router.get('/contas/saldo', bankController.saldoConta);
router.get('/contas/extrato', bankController.extratoConta);

module.exports = router;