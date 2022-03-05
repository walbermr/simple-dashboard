import React, { useEffect, useState } from 'react';
import "reflect-metadata";
import { createConnection, getRepository } from 'typeorm';
import './App.css';
import { Contact } from './database/typeorm/entities/Contact';
import { Product } from './database/typeorm/entities/Product';
import ConnectionObject from './utils/connectionObject';

import BuildHeader from './components/BuildHeader';
import DrawProductTable from './components/DrawProductTable';

import { getProductTable, newProduct } from './database/helpers/Product';

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<string>('');
    const [count, setCount] = useState(0);

    const [message, setMessage] = useState<string>('');
    const [responses, setResponses] = useState<any[]>([]);

    useEffect(() => {
        createConnection(ConnectionObject).catch(console.error)
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
                <button onClick={() => {
                    let newProd = newProduct(productName, productPrice);
                    setProductName("")
                    setProductPrice("")
                    setProducts((p: any) => [...p, newProd]);
                }}>new product</button>

                <div>
                    <p style={{ background: "white" }}>Você clicou {count} vezes</p>
                    <button onClick={() => setCount(count + 1)}>
                        Clique aqui
                    </button>
                </div>

                <hr />
                <div>
                    <button onClick={() => getProductTable().then(
                        (result: any[]) => { setProducts(result) }
                    )}>
                        Update Table
                    </button>
                </div>

                <DrawProductTable products={products}></DrawProductTable>
            </section>
        </div>
    );
}

export default App;