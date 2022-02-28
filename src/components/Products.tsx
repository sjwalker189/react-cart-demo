import React from "react";
import useProducts from "../hooks/useProducts";

import type {Product} from '../types';

type ListItemProps = {
    name: string,
    price: number,
    onAdd: () => void
}

function ListItem({ name, price, onAdd }: ListItemProps) {
    const formattedPrice = React.useMemo(() => {
        return price.toFixed(2);
    }, [price])

    return (
    <tr>
        <td>{name}</td>
        <td>${formattedPrice}</td>
        <td>
            <button onClick={onAdd}>Add to Cart</button>
        </td>
    </tr>
)
}

export default function List()
{
    const products = useProducts();

    const addToCart = (product: Product) => {
        //..
    }

    return (
        <table>
            <tbody>
                {products.map(product => (
                    <ListItem onAdd={() => addToCart(product)} {...product} />
                ))}
            </tbody>
        </table>
    );
}