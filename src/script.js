// estoque
let estoque = []

// ID

let id = 1

// troca de tela

function trocarTela(id) {
    const telas = document.querySelectorAll(".tela")

    telas.forEach((tela) => {
        tela.classList.remove("ativa")
    })

    const telaSelecionada = document.getElementById(id)

    telaSelecionada.classList.add("ativa")
}

const sidebar = document.querySelector(".sidebar")

sidebar.addEventListener("click", (e) => {

    const tela = e.target.dataset.tela

    if(tela && e.target.tagName === "BUTTON") {
        trocarTela(tela)
    }
    
})

// seleção
const addProductBtn = document.getElementById("add-product-btn")
const estoqueContainer = document.getElementById("estoque-container")

const estoqueSalvo = localStorage.getItem("estoque")

if (estoqueSalvo) {
   estoque = JSON.parse(estoqueSalvo)

   if(estoque.length > 0) {

   const arrayId = estoque.map(produto => produto.id)

   const maiorId = Math.max(...arrayId)

   id = maiorId + 1
   } 
}

renderEstoque()

// eventos
estoqueContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-product-btn")) {

    const productId = Number(e.target.dataset.id)

    removerProduto(productId)
    }
})


addProductBtn.addEventListener("click", (e) => {

    const addProductName = document.getElementById("add-product-name")
    const addProductQuantity = document.getElementById("add-product-quantity")
    const addProductPrice = document.getElementById("add-product-price")

    // converte string a number

    const quantity = Number(addProductQuantity.value)
    const price = Number(addProductPrice.value)
    const productName = addProductName.value


    // validação de dados recebidos

    if(productName === "" || quantity <= 0 || price <= 0) {
        console.log("Produto inválido!")
    } else {
        const produto = { id: id, nome: productName, quantidade: quantity, preco: price }
       
        estoque.push(produto)

        id++

        salvarEstoque()

        renderEstoque()

        const successMessage = document.getElementById("success-message")

        successMessage.classList.remove("hide")      

        setTimeout(() => {
        addProductName.value = ""
        addProductQuantity.value = ""
        addProductPrice.value = ""

        successMessage.classList.add("hide")
        }, 1000) 
    }
})


function renderEstoque() {

    estoqueContainer.innerHTML = ""

    estoque.forEach((produto) => {
        const idFormatado = String(produto.id).padStart(4, "0")

        const card = `
        <div class="card">
        <p>Código do produto: ${idFormatado}</p>
        <p>Nome do produto: ${produto.nome}</p>
        <p>Quantidade em estoque: ${produto.quantidade}</p>
        <p>Preço do produto: R$ ${produto.preco}</p>
        <button class="delete-product-btn" data-id="${produto.id}">Remover produto</button>
        </div>
        `
        
        estoqueContainer.innerHTML += card

    })
}

// remover produto

function removerProduto(id) {
    estoque = estoque.filter(produto => produto.id !== id)

    salvarEstoque()

    renderEstoque()
}

// editar produto

let produtoEmEdicao = null

const updateStockBtn = document.getElementById("update-stock-btn")

updateStockBtn.addEventListener("click", (e) => {

    if (!produtoEmEdicao) {
        buscarProduto()
    } else {
        const inputNome = document.getElementById("update-product-name")
        const novoNome = inputNome.value
        
        produtoEmEdicao.nome = novoNome

        const inputPrice = document.getElementById("update-product-price")
        const novoPrice = Number(inputPrice.value)

        const inputQuantity = document.getElementById("update-product-quantity")
        const novaQuantity = Number(inputQuantity.value)

        if (novoPrice <= 0 || novaQuantity <= 0 || novoNome === "") {
        console.log("Dados inválidos")
        return
        }

        produtoEmEdicao.preco = novoPrice
        produtoEmEdicao.quantidade = novaQuantity

        salvarEstoque()

        renderEstoque()

        produtoEmEdicao = null

        inputNome.value = ""
        inputPrice.value = ""
        inputQuantity.value = ""

        inputNome.classList.add("hide")
        const labelNome = document.getElementById("label-product-name")
        labelNome.classList.add("hide")

        inputPrice.classList.add("hide")
        const labelPrice = document.getElementById("label-product-price")
        labelPrice.classList.add("hide")

        inputQuantity.classList.add("hide")
        const labelQuantity = document.getElementById("label-product-quantity")
        labelQuantity.classList.add("hide")

        const produtoId = document.getElementById("update-product-id")
        produtoId.value = ""
}
    
})

function buscarProduto() {
    const produtoId = document.getElementById("update-product-id")
    const valorId = Number(produtoId.value)

    const produtoEncontrado =  estoque.find((produto) => {return produto.id === valorId})

    if (!produtoEncontrado) {
    console.log("Produto não encontrado")
    } else {

    produtoEmEdicao = produtoEncontrado

    const labelNome = document.getElementById("label-product-name")
    labelNome.classList.remove("hide")

    const inputNome = document.getElementById("update-product-name")
    inputNome.value = produtoEncontrado.nome
    inputNome.classList.remove("hide")

    const labelPrice = document.getElementById("label-product-price")
    labelPrice.classList.remove("hide")

    const inputPrice = document.getElementById("update-product-price")
    inputPrice.value = produtoEncontrado.preco
    inputPrice.classList.remove("hide")

    const labelQuantity = document.getElementById("label-product-quantity")
    labelQuantity.classList.remove("hide")

    const inputQuantity = document.getElementById("update-product-quantity")
    inputQuantity.value = produtoEncontrado.quantidade
    inputQuantity.classList.remove("hide")
    }

}

function salvarEstoque() {
   localStorage.setItem("estoque", JSON.stringify(estoque))
}