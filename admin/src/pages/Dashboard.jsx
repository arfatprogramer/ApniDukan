import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import React from 'react'
import { toast } from 'react-toastify'
import StatCard from '../components/common/StatCard'
import SalesOverviewChart from '../components/overview/SalesOverviewChart'
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart'
import SalesChannelChart from '../components/overview/SalesChannelChart'
import Title from "../components/Title";
import Header from "../components/Header";
import { useState } from "react";
import { allProduct, dashboard } from "../common/ApiUrls";
import { useEffect } from "react";
import displayCurrency from "../helper/displayCurrency";

const Dashboard = () => {
	const [data,setData]=useState([])

	 const allProductData = async () => {
			const response = await fetch(dashboard.url)
			const data = await response.json()
			if (data.success) {
				setData(data?.data || [])
			}
			if (data.error) {
				toast.error(data.message)
			}
		}

	useEffect(()=>{
		allProductData()
	},[])

  return (
    <div className=''>
		 
		 <Title title='Dashboard' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Sales' icon={Zap} value={displayCurrency(data?.totalSalesAmount)} color='#6366F1' />
					<StatCard name='New Users' icon={Users} value={data?.newUsers} color='#8B5CF6' />
					<StatCard name='Total Products' icon={ShoppingBag} value={data?.totalProduct?.length} color='#EC4899' />
					<StatCard name='Conversion Rate' icon={BarChart2} value={Math.floor(data?.conversionRate) + "%"} color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart sales={data?.salesOverViewArray} />
					<CategoryDistributionChart products={data?.totalProduct} />
					
				</div>
			</main>
    </div>
  )
}

export default Dashboard
