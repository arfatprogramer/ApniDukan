import React, { useEffect, useState } from 'react'
import { allProduct } from '../common/ApiUrls'
import { toast } from 'react-toastify'
import UpdateProduct from '../components/UpdateProduct'
import Title from '../components/Title'
import StatCard from '../components/common/StatCard'
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import ProductsTable from '../components/products/ProductsTable'
import SalesTrendChart from '../components/products/SalesTrendChart'
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart'
import displayCurrency from '../helper/displayCurrency'
import DeleteConfirmBox from "../components/DeleteConfirmBox";

const Products = () => {
    const [products, setProducts] = useState([])  // it store all product details
    const [openUpdate, setOpenUpdate] = useState(false) //// it use for open and close update Product form
    const [openDeleteBox, setOpenDeleteBox] = useState(false)
    const [updateProduct, setUpdateProduct] = useState("")
    const [statCardData, setStatCardData] = useState([])
    const [deleteData, setDeleteData] = useState({})


    const allProductData = async () => {
        const response = await fetch(allProduct.url)
        const data = await response.json()
        if (data.success) {
            setProducts(data?.data || [])
        }
        if (data.error) {
            toast.error(data.message)
        }
    }

    const calculeData = () => {
        let TotalProducts = products.length
        let TopSelling = 0
        let LowStock = 0
        let TotalRevenue = 0
        products.forEach((product) => {
            if (product.stock <= 5) {
                LowStock += 1
            }
            if (product.stock > 5) {
                TopSelling += 1
            }
            TotalRevenue += (product.selling * product.stock)
        });
        setStatCardData({ TotalProducts, TopSelling, LowStock, TotalRevenue })
    }



useEffect(() => {
    allProductData()
    calculeData()
}, [])
useEffect(()=>{
    calculeData()
},[products])

return (
    <>
        <Title title='Products Dashboard' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
            {/* STATS */}
            <motion.div
                className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <StatCard name='Total Products' icon={Package} value={statCardData.TotalProducts} color='#6366F1' />
                <StatCard name='Top Selling' icon={TrendingUp} value={statCardData.TopSelling} color='#10B981' />
                <StatCard name='Low Stock' icon={AlertTriangle} value={statCardData.LowStock} color='#F59E0B' />
                <StatCard name='Total Revenue' icon={DollarSign} value={displayCurrency( statCardData.TotalRevenue)} color='#EF4444' />
            </motion.div>

            <ProductsTable 
            setUpdateProduct={setUpdateProduct} 
            setOpenUpdate={setOpenUpdate} 
            allProducts={products}
            setDeleteData={setDeleteData}
            setOpenDeleteBox={setOpenDeleteBox} />

            {/* CHARTS */}
            <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                <SalesTrendChart />
                <CategoryDistributionChart products={products} />
            </div>
            {
                openDeleteBox && <DeleteConfirmBox 
                onClose={() => setOpenDeleteBox(false)}
                title="Delete Product" 
                deleteData={deleteData} 
                reloadData={allProductData }
                text={"Are you sure delete the Product?"} />
            }

            {openUpdate && <UpdateProduct
                    onClose={() => setOpenUpdate(false)} 
                    allProductData={allProductData}
                    updateProduct={updateProduct}
                    />
                }
        </main>
    </ >
)
}

export default Products
