const dados = require('../db/bancodedados')

const verifica = ( obj =>{
    let valida = false;
    const contas = dados.contas;
    if (!obj.nome) {
        return  "O nome precisa ser informado!" 
    }
    else if (!obj.cpf) {
        return  "O cpf precisa ser informado!" 
    }
    else if (!obj.data_nascimento) {
        return "A data de nascimento precisa ser informada!"
    }
    else if (!obj.telefone) {
        return "O telefone precisa ser informado!" 
    }
    else if (!obj.email) {
        return "O email precisa ser informado!" 
    }
    else if (!obj.senha) {
        return "A senha precisa ser informada!"
    }
    else {
        for (let conta of contas) {
            if (obj.cpf === conta.usuario.cpf) {  
                    return "Já existe uma conta com o CPF informado!"   
            }
            else if (obj.email === conta.usuario.email) {
                return   "Já existe uma conta com o email informado!"
            }
        }
        return valida = true
    }
})

module.exports = verifica