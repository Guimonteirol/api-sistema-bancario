const { Router } = require('express');
const router = Router();
const validation = require('../middlewares/middlewares');
const contasRouter = require('./contasRouter.js')
const transacoesRouter = require('./transacoesRouter')

router.use(validation.validation);
router.use(contasRouter)
router.use(transacoesRouter)

module.exports = router