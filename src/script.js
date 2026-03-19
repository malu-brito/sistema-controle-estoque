// estoque
let estoque = []

// ID

let id = 1

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
        <h3>Estoque</h3>
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

function editarProduto(produto) {

    estoque.find(produto => produto.id === idProcurado)


    estoque.forEach(produto => {

    })
}

function salvarEstoque() {
   localStorage.setItem("estoque", JSON.stringify(estoque))
}