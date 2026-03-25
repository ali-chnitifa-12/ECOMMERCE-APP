import { useEffect, useState } from "react";
import gsap from "gsap";

const Dashboard = () => {
    const [stats, setStats] = useState([
        { label: "Total Revenue", value: "$12,450", change: "+12.5%", icon: "💰" },
        { label: "Total Orders", value: "156", change: "+8.2%", icon: "📦" },
        { label: "Total Products", value: "24", change: "+2", icon: "👞" },
        { label: "Active Users", value: "1,240", change: "+5.4%", icon: "👤" },
    ]);

    useEffect(() => {
        gsap.from(".stat-card", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-display">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Export Data</button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors cursor-pointer">View Reports</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="stat-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xs">#OR{1000 + i}</div>
                                    <div>
                                        <p className="text-sm font-bold">John Doe</p>
                                        <p className="text-xs text-gray-500">2 items · $250.00</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">PENDING</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">View All Orders</button>
                </div>

                <div className="stat-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Top Products</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                        <span className="text-xs text-gray-400">IMG</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Product Name {i}</p>
                                        <p className="text-xs text-gray-500">Sneakers · 45 Sales</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold">$120.00</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">Manage Products</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
