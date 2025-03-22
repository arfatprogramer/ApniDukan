import { toast } from 'react-toastify'
import { Cart } from '../common/apiData';

const addToCart = async (e, _id) => {
    e.preventDefault()

    const response = await fetch(Cart.url, {
        method: Cart.method,
        credentials: 'include',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId: _id })
    });

    const data = await response.json()

    if (data.success) {
        toast.success("Product Add Successfully")

    }
    if (data.error) {
        toast.error(data.message)

    }

}

export default addToCart
