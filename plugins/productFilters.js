export const filterProducts = (products, filters) => {
    
    const filteredProducts = products == null ? [] : products.filter( (product) => {
        for (let key in filters) {
            if (product[key] === undefined || !filters[key].includes(product[key].name)) {
                return false;
            }
        }
        return true;
    });
    return filteredProducts;
};