const dados = require('../db/bancodedados')
const db = require('../db/index')
const Bank = require('../models/bancoModel')
const verifica = require('../utils/verifica')
module.exports = {
    async getContas(req, res) {
        try {
            let query = {};
            const show = await Bank.find(query).lean()
            res.status(201).json(show);
        } catch (error) {
            return res.status(404).json({
                'message': `Error ${error.message}`
            })
        }
    },

    async createConta(req, res) {
        try {
            let valida = true;
            const contas = dados.contas;
            const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
            if (verifica(req.body) !== true) {
                res.status(500).json({ mensagem: verifica(req.body) })
            }

            if (verifica(req.body) === true) {
                const actualDate = new Date();
                const userComplement = actualDate.getTime();
                const _id = userComplement.toString();
                const novaConta = new Bank({
                    numero: _id, saldo: 0, usuario: {
                        nome: nome, cpf: cpf, data_nascimento: data_nascimento,
                        telefone: telefone, email: email, senha: senha
                    }
                })
                const collection = db.contas.insert
                novaConta.save()
                // contas.push(novaConta)
                res.status(201).json({novaConta})
            }
        }
        catch (error) {
            return res.status(404).json({
                'message': `Error ${error.message}`
            })
        }

    },

    async updateConta(req, res) {
        const { numeroConta } = req.params
        const contas = dados.contas;
        let update = contas.find(conta => conta.numero === numeroConta);
        if (update) {
            const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
            if (verifica(req.body) !== true) {
                res.status(500).json({ mensagem: verifica(req.body) })
            }
            if (verifica(req.body) === true) {
                update.usuario = usuario = {
                    nome: nome,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    telefone: telefone,
                    email: email,
                    senha: senha
                }
                res.status(201).json({})
            }
        }

        else {
            res.status(500).json({ mensagem: "Usuário não encontrado" })
        }


    },

    async deleteConta(req, res) {
        try {
            const { numeroConta } = req.params
            const contas = dados.contas;
            let conta = contas.find(conta => conta.numero === numeroConta)
            if (!conta) {
                return res.status(400).json({
                    'message': "Conta não existe"
                })
            }
            else if (conta.saldo === 0) {
                let contas = dados.contas.filter(conta => conta.numero != numeroConta)
                dados.contas = contas
                return res.status(201).json({})
            }
            else {
                return res.status(400).json({
                    'message': "A conta só pode ser removida se o saldo for zero!"
                })
            }
        } catch (error) {
            return res.status(404).json({
                'message': `Error ${error.message}`
            })
        }
    }
}