import React from "react";
import useProducts from "../hooks/useProducts";

import type {Cart} from '../hooks/useCart';

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
        <td className="p-2">{name}</td>
        <td className="p-2">${formattedPrice}</td>
        <td className="p-2 text-right">
            <button onClick={onAdd} className="text-sky-400 hover:text-sky-600">Add to Cart</button>
        </td>
    </tr>
)
}

function List({ cart }: { cart: Cart }) {
    const products = useProducts();

    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr>
                    <th className="p-2 bg-gray-100 font-bold">Product Name</th>
                    <th className="p-2 bg-gray-100 font-bold">Price</th>
                    <th className="p-2 bg-gray-100"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                    <ListItem key={product.id} onAdd={() => cart.addItem(product)} {...product} />
                ))}
            </tbody>
        </table>
    );
}

export default List;