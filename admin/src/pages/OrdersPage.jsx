import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import Title from "../components/Title";
import { cancleOrders, OrderDetails, viewCancelSingleProduct, viewSingleProduct } from "../common/ApiUrls";
import { useEffect, useState } from "react";
import displayCurrency from "../helper/displayCurrency";
import ViewOrderDetail from "../components/ViewOrderDetail";
import { useSelector } from "react-redux";



const OrdersPage = () => {

	const [order, setOrder] = useState([])
	const [cancelOrder, setCancelOrder] = useState([])
	const [orderStats, setOrderStats] = useState({})
	const [openviewOrder,setOpenviewOrder]=useState(false)
	const [viewOrderData,setViewOrderData]=useState({})
	const  token = useSelector((state) => state?.token?.token);

	const fetchOrderDetails = async () => {
		const ordersRequest = await fetch(OrderDetails.url, {
			method: OrderDetails.method,
			credentials: "include",
			headers: { 'Content-Type': 'application/json' },
			body:JSON.stringify({userToken:token}),
		})
		const orders = await ordersRequest.json()
		if (orders.success) {
			setOrder(orders.data)
		}
	}

	const findorderStats=()=>{
		let totalOrders = order.length;
		let totalRevenue = 0;
		let pendingOrders= 0
		let completedOrders= 0

		order.map((order)=>{
			totalRevenue=totalRevenue + (order.selling * order.quantity)
			if (order.deliveryStatus === "Pending ") {
				pendingOrders++;
			}
			if (order.deliveryStatus === "Delivered") {
				completedOrders++;
			}
		})

		totalRevenue=displayCurrency(totalRevenue)
		setOrderStats({
			totalOrders: totalOrders,
			pendingOrders: pendingOrders,
			completedOrders: completedOrders,
			totalRevenue: totalRevenue,
		})
	}

	const cancleOrdersDetails = async () => {
		const ordersRequest = await fetch(cancleOrders.url, {
			method: cancleOrders.method,
			headers: { "content-Type": "application/json" },
			credentials: "include"
		})
		const or = await ordersRequest.json()
		if (or.success) {
			setCancelOrder(or.data)
		}
	}

	useEffect(() => {
		fetchOrderDetails()
		cancleOrdersDetails()
	}, [])

	useEffect(() => {
		findorderStats()
	}, [order])

	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Title title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Orders' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
					<StatCard name='Pending Orders' icon={Clock} value={orderStats.pendingOrders} color='#F59E0B' />
					<StatCard
						name='Completed Orders'
						icon={CheckCircle}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
					<StatCard name='Total Revenue' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution  orderStatusDat={order} />
				</div>
				<div className="grid gap-8">

				<OrdersTable  setOpenviewOrder={setOpenviewOrder} orderData={order} title="Order List" setViewOrderData={setViewOrderData}  url={viewSingleProduct}/>
				<OrdersTable  setOpenviewOrder={setOpenviewOrder} orderData={cancelOrder} title="Cancel Order List" setViewOrderData={setViewOrderData} url={viewCancelSingleProduct} />
				</div>
			</main>
			{
				openviewOrder && <ViewOrderDetail  viewOrderData={viewOrderData} onClose={() => setOpenviewOrder(false)} />
			}
		</div>
	);
};
export default OrdersPage;
