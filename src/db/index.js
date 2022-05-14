const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb+srv://root:bugador1@cluster0.qtxt9.mongodb.net/api-bank")
}

main().then(()=> console.log("Conectado"))
.catch((e)=> console.log(e))

module.exports = mongoose;