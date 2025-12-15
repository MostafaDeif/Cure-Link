import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/JustLogo.jpg";

// ===== ICONS (aligned with Doctor layout) =====
const IconLayoutDashboard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const IconClipboardList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
    <path d="M9 10h6" />
    <path d="M9 14h6" />
  </svg>
);
const IconBoxes = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.3 7L12 12l8.7-5" />
    <path d="M12 22V12" />
  </svg>
);
const IconUser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);
const IconUserCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);
const IconMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);
const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// -------- SIDEBAR ----------
const Sidebar = ({ isOpen, toggleSidebar, currentView, onSelect }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, view: "dashboard" },
    { name: "Orders", icon: <IconClipboardList />, view: "orders" },
    { name: "Inventory", icon: <IconBoxes />, view: "inventory" },
    { name: "Profile", icon: <IconUser />, view: "profile" },
  ];
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg flex-col z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64`}
    >
      <div className="p-6 flex justify-between items-center border-b">
        <div
          onClick={() => navigate("/pharmacy-dashboard")}
          className="text-3xl font-bold text-[#006d77] cursor-pointer flex items-center"
        >
          <img src={logo} alt="Logo" className="h-8 w-8 mr-3 rounded" />
          CureLink
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          <IconX />
        </button>
      </div>
      <div className="p-6 text-center border-b">
        <img
          src="https://placehold.co/96x96/E0E7FF/4F46E5?text=RX"
          alt="Pharmacy"
          className="w-24 h-24 rounded-full mx-auto mb-3 cursor-pointer"
          onClick={() => onSelect("profile")}
        />
        <h2 className="text-lg font-semibold">CureLink Pharmacy</h2>
        <p className="text-sm text-gray-500">Main Branch</p>
      </div>
      <nav className="flex-1 mt-6 px-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              onSelect(item.view);
              toggleSidebar();
            }}
            className={`flex items-center w-full text-left px-4 py-3 mb-2 rounded-lg text-gray-600 hover:bg-[#E0F2F1] hover:text-[#006d77] ${
              currentView === item.view
                ? "bg-[#E0F2F1] text-[#006d77] font-bold"
                : ""
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// -------- HEADER ----------
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <header
      className={`bg-white shadow-sm p-4 flex justify-between items-center fixed top-0 left-0 right-0 transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      } z-40`}
    >
      <div className="flex items-center">
        {!isSidebarOpen && (
          <button
            className="text-gray-600 hover:text-[#006d77] mr-4"
            onClick={toggleSidebar}
          >
            <IconMenu />
          </button>
        )}
      </div>
      <div className="flex items-center space-x-6 ml-auto">
        <button className="text-gray-500 hover:text-gray-700">
          <IconSearch />
        </button>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/pharmacy-profile")}
        >
          <IconUserCircle />
        </button>
      </div>
    </header>
  );
};

const dummyOrders = [
  {
    id: "001",
    customerName: "John Doe",
    status: "Pending",
    totalAmount: "$100",
  },
  {
    id: "002",
    customerName: "Jane Smith",
    status: "Completed",
    totalAmount: "$150",
  },
  {
    id: "003",
    customerName: "Alice Johnson",
    status: "Shipped",
    totalAmount: "$200",
  },
  {
    id: "004",
    customerName: "Bob Brown",
    status: "Cancelled",
    totalAmount: "$50",
  },
];

export default function PharmacyDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [view, setView] = useState("orders"); // 'orders' | 'dashboard' | 'inventory' | 'profile'
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const seedInventory = [
    {
      id: "INV-001",
      name: "Paracetamol 500mg",
      manufacturer: "ACME Pharma",
      price: "4.99",
      quantity: "120",
      description: "Pain reliever",
    },
    {
      id: "INV-002",
      name: "Amoxicillin 250mg",
      manufacturer: "HealthCorp",
      price: "7.50",
      quantity: "60",
      description: "Antibiotic",
    },
    {
      id: "INV-003",
      name: "Loratadine 10mg",
      manufacturer: "GoodMeds",
      price: "6.25",
      quantity: "80",
      description: "Allergy relief",
    },
  ];
  const inventoryItems = [...seedInventory, ...medicines];
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newMed = {
      id: `med-${Date.now()}`,
      ...form,
    };
    setMedicines((m) => [newMed, ...m]);
    setForm({
      name: "",
      manufacturer: "",
      price: "",
      quantity: "",
      description: "",
    });
    setView("orders"); // optionally switch to orders after add
  };

  const filteredOrders = dummyOrders.filter(
    (o) =>
      o.id.includes(search) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentView={view}
        onSelect={setView}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#0f172a]">
              {view === "dashboard" && "Pharmacy Dashboard"}
              {view === "orders" && "Orders"}
              {view === "inventory" && "Inventory"}
              {view === "profile" && "Pharmacy Profile"}
            </h1>

            {view === "orders" && (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Order ID, Customer Name..."
                  className="px-4 py-2 border rounded-lg w-80"
                />
                <button
                  onClick={() => setView("dashboard")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  + Create New Medicine
                </button>
              </div>
            )}

            {view === "dashboard" && (
              <div>
                <button
                  onClick={() => {
                    setView("orders");
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Back to Orders
                </button>
              </div>
            )}
          </div>

          {/* Dashboard */}
          {view === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Today's Orders</p>
                    <p className="text-3xl font-bold mt-1">24</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Items in Stock</p>
                    <p className="text-3xl font-bold mt-1">
                      {inventoryItems.length}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="text-3xl font-bold mt-1">5</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-gray-600">
                          <th className="py-2 pr-4">Order ID</th>
                          <th className="py-2 pr-4">Customer</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyOrders.slice(0, 3).map((o) => (
                          <tr key={o.id} className="border-t">
                            <td className="py-2 pr-4 font-medium">{o.id}</td>
                            <td className="py-2 pr-4">{o.customerName}</td>
                            <td className="py-2 pr-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  o.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : o.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : o.status === "Shipped"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {o.status}
                              </span>
                            </td>
                            <td className="py-2 pr-4">{o.totalAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Add Medicine</h3>
                  <form onSubmit={handleAddMedicine} className="space-y-3">
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Medicine Name"
                      className="w-full px-4 py-2 border rounded"
                    />
                    <input
                      value={form.manufacturer}
                      onChange={(e) =>
                        setForm({ ...form, manufacturer: e.target.value })
                      }
                      placeholder="Manufacturer"
                      className="w-full px-4 py-2 border rounded"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                        placeholder="Price"
                        className="px-4 py-2 border rounded"
                      />
                      <input
                        value={form.quantity}
                        onChange={(e) =>
                          setForm({ ...form, quantity: e.target.value })
                        }
                        placeholder="Quantity"
                        className="px-4 py-2 border rounded"
                      />
                    </div>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Description (optional)"
                      className="w-full px-4 py-2 border rounded"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="bg-[#006d77] text-white px-4 py-2 rounded"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            name: "",
                            manufacturer: "",
                            price: "",
                            quantity: "",
                            description: "",
                          })
                        }
                        className="bg-gray-100 px-4 py-2 rounded"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Orders View */}
          {view === "orders" && (
            <div>
              {/* Filter Section */}
              <div className="bg-white p-4 rounded-lg mb-6">
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="all-orders"
                      name="status"
                      defaultChecked
                    />
                    <label htmlFor="all-orders">All Orders</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="date-range" name="status" />
                    <label htmlFor="date-range">Date Range</label>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <table className="w-full bg-white rounded-lg">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Medicine Name</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-4">{order.id}</td>
                      <td className="p-4">{order.customerName}</td>
                      <td className="p-4">{order.status}</td>
                      <td className="p-4">{order.totalAmount}</td>
                      <td className="p-4">
                        <button className="text-blue-500">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Inventory View */}
          {view === "inventory" && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Inventory</h3>
                <button
                  onClick={() => setView("dashboard")}
                  className="bg-[#006d77] text-white px-4 py-2 rounded"
                >
                  + Add Medicine
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-700">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Manufacturer</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((m) => (
                      <tr key={m.id} className="border-t">
                        <td className="py-3 px-4 font-medium">{m.id}</td>
                        <td className="py-3 px-4">{m.name}</td>
                        <td className="py-3 px-4">{m.manufacturer}</td>
                        <td className="py-3 px-4">{m.quantity}</td>
                        <td className="py-3 px-4">${m.price}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {m.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Profile View */}
          {view === "profile" && (
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex flex-col items-center">
                  <img
                    src="https://placehold.co/96x96/E0E7FF/4F46E5?text=RX"
                    alt="Pharmacy"
                    className="w-40 h-40 rounded-full border-4 border-[#006d77]"
                  />
                  <button className="mt-4 px-4 py-2 bg-[#006d77] text-white rounded-lg hover:bg-[#005a63] transition">
                    Change Photo
                  </button>
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-semibold text-[#006d77] mb-6">
                    Pharmacy Information
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Pharmacy Name
                      </label>
                      <input
                        type="text"
                        defaultValue="CureLink Pharmacy"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="pharmacy@curelink.com"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        defaultValue="(02) 12345678"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Branch
                      </label>
                      <input
                        type="text"
                        defaultValue="Main Branch"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        defaultValue="Giza, Egypt"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Working Hours
                      </label>
                      <input
                        type="text"
                        defaultValue="Mon-Fri 9:00 AM - 9:00 PM"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                      />
                    </div>
                  </form>
                  <div className="flex justify-end mt-8">
                    <button className="px-6 py-2 rounded-lg bg-[#006d77] text-white hover:bg-[#005a63] transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
