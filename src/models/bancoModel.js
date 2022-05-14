const { model, Schema } = require("mongoose");

const Bank = model("Bank", new Schema({
    banco: {
        type: Object,
        required: true
    },
    contas: {
        type: [{
            numero: {
                type: String,
                required: true
            },
            saldo: {
                type: Number,
                required: true
            },
            usuario: {
                type: [{
                    nome: {
                        type: String,
                        required: true
                    },
                    cpf: {
                        type: String,
                        required: true
                    },
                    data_nascimento: {
                        type: String,
                        required: true
                    },
                    telefone: {
                        type: String,
                        required: true
                    },
                    email: {
                        type: String,
                        required: true
                    },
                    senha: {
                        type: String,
                        required: true
                    }
                }],
                required: true
            },
        }],
        required: true
    },
    saques: {
        type: Array,
        required: true
    },
    depositos: {
        type: Array,
        required: true
    },
    transferencia: {
        type: Array,
        required: true
    },
}))

module.exports = Bank