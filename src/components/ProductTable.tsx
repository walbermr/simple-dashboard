import React, { useEffect, useState } from 'react';

import { Product } from '../database/typeorm/entities/Product';
import Table from 'react-bootstrap/Table';

import { deleteProduct, newProduct, getProductTable } from '../database/helpers/Product';
import Button from 'react-bootstrap/Button'

type MyState = { value: string };

class NameForm extends React.Component<{}, MyState> {
        constructor(props: any) {
            super(props);
            this.state = {value: ''};
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

    handleChange(event: any) {  this.setState({value: event.target.value}); }
    handleSubmit(event: any) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }
}

function RemoveProductTableEntry(id: any, products: Product[]){
    var newProds: Product[] = [];

    for (var i = 0, j = 0; j < products.length; i++, j++) {
        if (products[i].id != id) {
            newProds.push(products[i]);
        }
    }

    console.log(newProds);
    deleteProduct(id);
    return newProds;
}

function AddProductTableEntry(name: any, price: any, products: Product[]){
    let prod = newProduct(name, price);
    return [...products, prod];
}

async function UpdateProductTable(setProducts: any){
    return getProductTable().then((result: Product[]) => setProducts(result))
}

function ProductTableEntry(product: Product, setProducts: any) {

    return (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td><Button className="bi bi-trash btn btn-danger" onClick={() => setProducts((p: Product[]) => RemoveProductTableEntry(product.id, p))}></Button></td>
            <td><Button className="bi bi-pencil btn btn-success"></Button></td>
        </tr>
    )
}

function DrawProductTable(props: any) {
    const products = props.products
    let setProducts = props.setProducts

    return (
        <div>
            <NameForm/>
            <Table>
                <thead>
                    <th>Name</th>
                    <th>Price</th>
                    <th style={{width: "10px"}}></th>
                    <th style={{width: "10px"}}></th>
                </thead>
                <tbody>
                    {products.map((p: any, index: any) => { return ProductTableEntry(p, setProducts) })}
                </tbody>
            </Table>
        </div>
    )
}

export { DrawProductTable, RemoveProductTableEntry, AddProductTableEntry, UpdateProductTable }
