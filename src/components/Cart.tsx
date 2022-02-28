import React from 'react';
import { Cart } from '../hooks/useCart';


const EmptyPlaceholder = () => (
    <tr>
        <td className="p-2 text-gray-500">Your cart is currently empty.</td>
    </tr>
)

const CartTable = ({ cart }: { cart: Cart }) => {
    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr>
                    <th className="p-2 bg-gray-100 font-bold">Product Name</th>
                    <th className="p-2 bg-gray-100 font-bold">Price</th>
                    <th className="p-2 bg-gray-100 font-bold">Qty</th>
                    <th className="p-2 bg-gray-100 font-bold">Total</th>
                    <th className="p-2 bg-gray-100 font-bold"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {cart.items.length === 0 && <EmptyPlaceholder />}
                {cart.items.map(item => (
                    <tr key={item.id}>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">${item.price}</td>
                        <td className="p-2">{item.qty}</td>
                        <td className="p-2">${item.totalFormatted}</td>
                        <td className="p-2 text-right">
                            <button onClick={() => cart.removeItem(item)} className="text-rose-400 hover:text-rose-600">
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            {cart.items.length > 0 && (
                <tfoot>
                    <tr>
                        <td className="pt-3 font-bold">
                            Total: ${cart.totalValue}
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    )
}

export default CartTable;