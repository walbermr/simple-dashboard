import React, { useEffect, useState } from 'react';
import { Product } from '../database/typeorm/entities/Product';

export default (product: Product) => {
    return (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{` ${product.price}`}</td>
        </tr>
    )
}