import React, { useState } from 'react';

import { getRepository } from 'typeorm';

import { Product } from '../../database/typeorm/entities/Product';
import { sendAsync } from '../../message-control/renderer';

function getProductTable() {
    return sendAsync("SELECT * FROM product")
}

function deleteProduct(id: any){
    return sendAsync(`DELETE FROM product WHERE id==${id}`)
}

async function saveProduct(product: Product) {
    getRepository(Product).save(product)
}

function newProduct(name: any, price: any) {
    const product = new Product()
    product.name = name;
    product.price = Number(price);

    saveProduct(product);
    return product
}

export { getProductTable, newProduct, deleteProduct }