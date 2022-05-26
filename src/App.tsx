import React, { useEffect, useState } from 'react';
import "reflect-metadata";
import { createConnection, getRepository } from 'typeorm';
import './App.css';
import { Contact } from './database/typeorm/entities/Contact';
import { Product } from './database/typeorm/entities/Product';
import ConnectionObject from './utils/connectionObject';

import BuildHeader from './components/BuildHeader';
import {DrawProductTable, RemoveProductTableEntry, AddProductTableEntry, UpdateProductTable} from './components/ProductTable';

import { getProductTable, newProduct } from './database/helpers/Product';

import Button from 'react-bootstrap/Button'

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<string>('');
    const [count, setCount] = useState(0);

    const [message, setMessage] = useState<string>('');
    const [responses, setResponses] = useState<any[]>([]);

    useEffect(() => {
        createConnection(ConnectionObject).catch(console.error)
        // UpdateProductTable(setProducts);
    }, [])


    return (
        <div className="App">
            <BuildHeader messageState={[message, setMessage]} responsesState={[responses, setResponses]}></BuildHeader>

            <section style={{ padding: "50px 0" }}>
                <input
                    type="text"
                    value={productName}
                    placeholder={"productName"}
                    onChange={(e) => setProductName(e.target.value)}
                />
                
                <input
                    type="number"
                    value={productPrice}
                    placeholder={"productPrice"}
                    onChange={(e) => setProductPrice(e.target.value)}
                />

                <button onClick={() => { setProducts((p: any) => {
                    setProductName("");
                    setProductPrice("");
                    return AddProductTableEntry(productName, productPrice, p);
                })}}>new product</button>

                <div>
                    <p style={{ background: "white" }}>Você clicou {count} vezes</p>
                    <button onClick={() => setCount(count + 1)}>
                        Clique aqui
                    </button>
                </div>
                
                <hr />
                <div>
                    <Button variant="primary" onClick={() => UpdateProductTable(setProducts)}>Update Table</Button>
                </div>

                <DrawProductTable products={products} setProducts={setProducts} />
            </section>
        </div>
    );
}

export default App;