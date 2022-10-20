function updatePartners() {
    const prodCtas = productsDB.find(elem => elem.id === productId).categories;
    partnerDB.forEach(part => {
        if (part.categories.some(r => prodCtas.includes(r))) {
            part.products.push(productId);
        }
    })
    console.log(partnerDB);
}

function createProduct() {

}