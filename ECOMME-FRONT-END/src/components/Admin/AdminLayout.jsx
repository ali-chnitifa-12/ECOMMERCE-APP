import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Routes that are not yet implemented — rendered as disabled items
    const comingSoonPaths = ["/admin/orders", "/admin/users"];

    const menuItems = [
        {
            name: "Overview", path: "/admin", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
            )
        },
        {
            name: "Products", path: "/admin/products", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            )
        },
        {
            name: "Orders", path: "/admin/orders", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            )
        },
        {
            name: "Users", path: "/admin/users", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-3.833-6.242 4.125 4.125 0 0 0-3.833 6.242ZM15 19.128v-3.336a3.015 3.015 0 0 1 1.03-2.263 4.123 4.123 0 0 0-4.03-6.029 4.122 4.122 0 0 0-4.03 6.029 3.015 3.015 0 0 1 1.03 2.263v3.336m9.843-10.02a4.125 4.125 0 1 1-6.173-3.66 4.125 4.125 0 1 1 6.173 3.66Z" />
                </svg>
            )
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 pt-20">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-20 h-[calc(100vh-80px)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${isSidebarOpen ? "w-64" : "w-20"}`}>
                <div className="p-4 flex flex-col h-full">
                    <nav className="flex-1 space-y-1">
                        {menuItems.map((item) => {
                            const isComingSoon = comingSoonPaths.includes(item.path);
                            const isActive = location.pathname === item.path;

                            if (isComingSoon) {
                                return (
                                    <div
                                        key={item.name}
                                        title="Coming soon"
                                        className="flex items-center p-3 rounded-xl text-gray-300 cursor-not-allowed select-none"
                                    >
                                        <span className="flex-shrink-0">{item.icon}</span>
                                        {isSidebarOpen && (
                                            <span className="ml-3 font-medium flex items-center gap-2">
                                                {item.name}
                                                <span className="text-[9px] font-bold uppercase tracking-widest bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                                                    Soon
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}
                                >
                                    <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-black"}`}>
                                        {item.icon}
                                    </span>
                                    {isSidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="mt-auto p-3 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-black transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen ? "rotate-180" : ""}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"} p-8`}>
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
