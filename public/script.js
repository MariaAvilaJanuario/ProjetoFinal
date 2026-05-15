const botao = document.getElementById("carregar");
const tabelaProdutos = document.getElementById("tabela_produtos");

botao.addEventListener('click', async () => {
    try{
        const resposta = await fetch('/api/produtos');
        const produtos = await resposta.json();
        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.estoque}</td>
            `;
            tabelaProdutos.appendChild(tr);
        });
        const linhaQuantidade = document.createElement('tr');
        linhaQuantidade.innerHTML = `
            <td colspan="3">
                Quantidade de Produtos: ${produtos.length}
            </td>
        `;
        tabelaProdutos.appendChild(linhaQuantidade);
    } catch (erro) {
        const linhaErro = document.createElement('tr');
        linhaErro.innerHTML = `
            <td colspan="3" style="color: red; text-aling: center;">
                Não foi possível carregar os produtos, tente novamente mais tarde...
            </td>
        `;
        tabelaProdutos.appendChild(linhaErro);
        console.log("Deu ruim! Erro " + erro);
    }
});            