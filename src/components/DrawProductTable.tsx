import ProductTableEntry from '../components/ProductTableEntry';

export default (props: any) => {
    const products = props.products

    return (
        <div>
            <table style={{ "background": "white" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any, index: any) => { return ProductTableEntry(product) })}
                </tbody>
            </table>
        </div>
    )
}