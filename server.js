const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = 3000;
const BASEDADOS = path.join(__dirname, "basedados.txt");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/api/produtos', async (requisiçao, resposta) => {
    try {
        const produtos = await lerBaseDeDados();
        resposta.json(produtos);
    } catch (erro) {
        console.error("Não foi possível acessar o Banco de Dados: " + erro);
        resposta.status(500).send("Não foi possível carregar os produtos")
    }
});

async function lerBaseDeDados() {
    const dados = (await fs.promises.readFile("basedados.txt", "utf-8"))
                                .trim()
                                .split(/\r?\n/)
    const produtos = [];
    dados.forEach(dado => {
        produtos.push(new Produto(dado));
    });
    return produtos;
}

function Produto(dados){
    const propriedades = dados.split('|');
    const prod = {};
    propriedades.forEach(propriedade => {
        const valores = propriedade.split(':');
        prod[valores[0].trim()] = valores[1].trim();
    });
    this.nome = prod.nome;
    this.preco = Number.parseFloat(prod.preco);
    this.estoque = Number.parseFloat(prod.estoque);
}