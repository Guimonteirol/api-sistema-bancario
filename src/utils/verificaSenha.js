const verificaSenha = (conta, senha) =>{
    if (!conta) {
        return  `A conta informada não existe`
    }
    if (conta.usuario.senha !== senha) {
        return `A senha está incorreta!`
    }
    return "Okay"
}

module.exports = verificaSenha;