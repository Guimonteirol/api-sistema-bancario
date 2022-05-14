const dados = require('../db/bancodedados')
const verificaSenha = require('../utils/verificaSenha')

module.exports = {
    async depositarConta(req, res) {
        try {
            const { numero_conta, valor } = req.body
            if (!numero_conta, !valor) {
                return res.status(404).json({
                    "mensagem": "O número da conta e o valor são obrigatórios!"
                })
            }
            let contas = dados.contas
            let conta = contas.find(conta => conta.numero === numero_conta)
            if (!conta) {
                return res.status(400).json({
                    "mensagem": "A conta informada não existe!"
                })
            }
            if (valor <= 0) {
                return res.status(400).json({
                    "mensagem": "O valor não pode ser menor que zero!"
                })
            }
            let deposito = conta.saldo += valor;
            contas.saldo = deposito
            const dataAtual = new Date();
            let registro = {
                "data": dataAtual,
                "numero_conta": numero_conta,
                "valor": valor
            }
            dados.depositos.push(registro)
            return res.status(201).json({})

        } catch (error) {
            return res.status(404).json({
                'message': `Error ${error.message}`
            })
        }
    },

    async sacarConta(req, res) {
        try {
            const { numero_conta, valor, senha } = req.body
            if (!numero_conta, !valor, !senha) {
                return res.status(404).json({
                    "mensagem": "O número da conta,o valor e a senha são obrigatórios!"
                })
            }
            let contas = dados.contas;
            let conta = contas.find(conta => conta.numero === numero_conta);
            if (verificaSenha(conta, senha) !== "Okay"){
               return res.status(404).json({'message': verificaSenha(conta)})
            }
            if (conta.saldo === 0) {
                return res.status(404).json({
                    'message': `O saldo precisa ser maior que 0!`
                })
            }
            if (valor > conta.saldo) {
                return res.status(404).json({
                    'message': `Não há saldo suficiente!`
                })
            }
            let saldo = conta.saldo;
            saldo = saldo - valor;
            conta.saldo = saldo;
            const dataAtual = new Date();
            let registro = {
                "data": dataAtual,
                "numero_conta": numero_conta,
                "valor": valor
            }
            dados.saques.push(registro)
            return res.status(201).json({})

        } catch (error) {
            return res.status(404).json({
                'message': `Error ${error.message}`
            })
        }
    },

    async transferirConta(req, res) {
        try {
            const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
            if (!numero_conta_origem, !numero_conta_destino, !valor, !senha) {
                return res.status(404).json({ 'mensagem': "Todos os campos precisam ser informados!" })
            }
            let contas = dados.contas
            let contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
            if (!contaOrigem) {
                return res.status(404).json({
                    'message': `A conta de Origem informada não existe!S`
                })
            }
            let contaDestino = contas.find(conta => conta.numero === numero_conta_destino);
            if (!contaDestino) {
                return res.status(404).json({
                    'message': `A conta de Destino informada não existe!`
                })
            }
            if (senha != contaOrigem.usuario.senha) {
                return res.status(404).json({
                    'message': `A senha da conta de Origem informada não está correta!`
                })
            }
            if (contaOrigem.saldo <= 0) {
                return res.status(404).json({
                    'message': `Saldo insuficiente!`
                })
            }
            let novoSaldoOrig = contaOrigem.saldo - valor;
            contaOrigem.saldo = novoSaldoOrig;
            let novoSaldoDest = contaDestino.saldo + valor;
            contaDestino.saldo = novoSaldoDest;
            const dataAtual = new Date()
            let transferencia = {
                "data": dataAtual,
                "numero_conta_origem": numero_conta_origem,
                "numero_conta_destino": numero_conta_destino,
                "valor": valor
            }
            dados.transferencias.push(transferencia)
            return res.status(201).json({})
        } catch (error) {
            return res.status(404).json({
                'message': `Error ${error.message}`
            })
        }
    },

    async saldoConta(req, res) {
        const { numero_conta, senha } = req.query;
        if (!numero_conta, !senha) {
            return res.status(404).json({
                'mensagem': "Todos os campos precisam ser informados!"
            })
        }
        let contas = dados.contas;
        let conta = contas.find(conta => conta.numero === numero_conta);
        if (verificaSenha(conta, senha) !== "Okay"){
           return res.status(404).json({'message': verificaSenha(conta)})
        }
        return res.status(201).json({
            "saldo": conta.saldo
        })


    },

    async extratoConta(req, res) {
        const { numero_conta, senha } = req.query;
        if (!numero_conta, !senha) {
            return res.status(404).json({
                'mensagem': "Todos os campos precisam ser informados!"
            })
        }
        let contas = dados.contas;
        let conta = contas.find(conta => conta.numero === numero_conta);
        if (verificaSenha(conta, senha) !== "Okay"){
           return res.status(404).json({'message': verificaSenha(conta)})
        }
        let saques = dados.saques;
        const saquesVetor = [];
        for (let saque of saques) {
            if (saque.numero_conta === numero_conta) {
                saquesVetor.push(saque)
            }
        }
        let depositos = dados.depositos;
        const depositosVetor = [];
        for (let deposito of depositos) {
            if (deposito.numero_conta === numero_conta) {
                depositosVetor.push(deposito)
            }
        }
        let transferencias = dados.transferencias;
        const transferenciasRecebidas = [];
        const transferenciasEnviadas = [];
        for (let transferencia of transferencias) {
            if (transferencia.numero_conta_origem === numero_conta) {
                transferenciasEnviadas.push(transferencia)
            }
            else if (transferencia.numero_conta_destino === numero_conta)
                transferenciasRecebidas.push(transferencia)
        }
        return res.status(201).json({
            "depositos": depositosVetor,
            "saques": saquesVetor,
            "transferenciasEnviadas": transferenciasEnviadas,
            "transferenciasRecebidas": transferenciasRecebidas
        })
    }
}

