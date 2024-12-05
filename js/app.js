let totalGeral;
limpar();

function adicionar() {
    // Recuperar valores do produto, quantidade e valor
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0].trim();
    let valorUnitario = parseFloat(produto.split('R$')[1].trim());
    let quantidade = parseInt(document.getElementById('quantidade').value);

    // Verificar se a quantidade é válida (maior que 0 e menor ou igual a 100)
    if (quantidade > 0 && quantidade <= 100) {
        let carrinho = document.getElementById('lista-produtos');
        let itensCarrinho = carrinho.getElementsByClassName('carrinho__produtos__produto');
        let itemExistente = null;

        // Verificar se o item já existe no carrinho
        for (let item of itensCarrinho) {
            if (item.dataset.nome === nomeProduto) {
                itemExistente = item;
                break;
            }
        }

        if (itemExistente) {
            // Atualizar quantidade e preço do item existente
            let quantidadeAtual = parseInt(itemExistente.dataset.quantidade);
            let novaQuantidade = quantidadeAtual + quantidade;
            let novoPreco = novaQuantidade * valorUnitario;

            itemExistente.dataset.quantidade = novaQuantidade;
            itemExistente.querySelector('.quantidade').textContent = `${novaQuantidade}x`;
            itemExistente.querySelector('.preco').textContent = `R$${novoPreco}`;
        } else {
            // Adicionar novo item ao carrinho
            let preco = quantidade * valorUnitario;
            carrinho.innerHTML += `<section class="carrinho__produtos__produto" data-nome="${nomeProduto}" data-quantidade="${quantidade}">
                <span class="texto-azul quantidade">${quantidade}x</span> ${nomeProduto} <span class="texto-azul preco">R$${preco}</span>
            </section>`;
        }

        // Atualizar o valor total
        totalGeral = totalGeral + (quantidade * valorUnitario);
        let campoTotal = document.getElementById('valor-total');
        campoTotal.textContent = `R$ ${totalGeral}`;
    } else if (quantidade > 100) {
        alert("A quantidade máxima permitida é 100.");
    } else {
        alert("Por favor, insira uma quantidade maior que 0.");
    }

    // Resetar o campo de quantidade para vazio
    document.getElementById('quantidade').value = '';
}

function limpar() {
    totalGeral = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0';
}
