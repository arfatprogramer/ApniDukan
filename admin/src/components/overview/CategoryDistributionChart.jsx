import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";


const COLORS = [
	"#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B",
	"#4CAF50", "#FF9800", "#9C27B0", "#2196F3", "#FF5722",
	"#795548", "#607D8B", "#E91E63", "#00BCD4", "#CDDC39",
	"#FFEB3B", "#9E9E9E", "#3F51B5", "#00B0FF", "#FF4081",
	"#673AB7", "#FFC107", "#FF9800", "#8BC34A", "#2196F3",
	"#FF1744", "#009688", "#3F51B5", "#FFEB3B", "#9C27B0"
  ];

const CategoryDistributionChart = ({products}) => {

	const [categoryData, SetCategoryData] = useState([]);
	
	const getCategories = () => {
	  const categoryCounts = {};
	
	  products?.forEach((product) => {
		const category = product.productCategory;
		if (categoryCounts[category]) {
		  categoryCounts[category]++;
		} else {
		  categoryCounts[category] = 1;
		}
	  });
	
	  const categoriesArray = Object.keys(categoryCounts).map((category) => ({
		name: category,
		value: categoryCounts[category],
	  }));
	  SetCategoryData(categoriesArray)
	  
	}
		
useEffect(()=>{
	getCategories()
},[products])

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Category Distribution</h2>
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={categoryData}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default CategoryDistributionChart;
