export const filterProduct = (products, id) => {    
    const filterProductsByID = products.filter((item) => item.id === id);
    const objectProducts = { ...filterProductsByID };

    return {objectProducts}
}

 
