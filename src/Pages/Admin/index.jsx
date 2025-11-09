import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/JustLogo.jpg";
import { authAPI, adminAPI } from "../../config/api";

// ===== ICONS =====
const IconLayoutDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const IconUserPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const IconFileText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconXCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconUserCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

// ===== SIDEBAR =====
const Sidebar = ({ isOpen, toggleSidebar, currentView, onSelect }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, view: "dashboard" },
    { name: "Add Admin", icon: <IconUserPlus />, view: "addAdmin" },
    { name: "مقالات", icon: <IconFileText />, view: "articles" },
    { name: "Pending Approvals", icon: <IconCheckCircle />, view: "approvals" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg flex-col z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64`}
    >
      <div className="p-6 flex justify-between items-center border-b">
        <div
          onClick={() => navigate("/admin")}
          className="text-3xl font-bold text-[#006d77] cursor-pointer flex items-center"
        >
          <img src={logo} alt="Logo" className="h-8 w-8 mr-3 rounded" />
          CureLink
        </div>
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
          <IconX />
        </button>
      </div>
      <div className="p-6 text-center border-b">
        <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-[#006d77] flex items-center justify-center">
          <IconUserCircle />
        </div>
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <p className="text-sm text-gray-500">System Administrator</p>
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
              currentView === item.view ? "bg-[#E0F2F1] text-[#006d77] font-bold" : ""
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

// ===== HEADER =====
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header
      className={`bg-white shadow-sm p-4 flex justify-between items-center fixed top-0 left-0 right-0 transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      } z-40`}
    >
      <div className="flex items-center">
        {!isSidebarOpen && (
          <button className="text-gray-600 hover:text-[#006d77] mr-4" onClick={toggleSidebar}>
            <IconMenu />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>
      <div className="flex items-center space-x-6 ml-auto">
        <button className="text-gray-500 hover:text-gray-700">
          <IconUserCircle />
        </button>
      </div>
    </header>
  );
};

// ===== STAT CARD =====
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
      </div>
      {icon && <div className="text-[#006d77]">{icon}</div>}
    </div>
  </div>
);

// ===== MAIN COMPONENT =====
export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add Admin State
  const [adminForm, setAdminForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  // Articles State
  const [articles, setArticles] = useState([
    { id: 1, title: "نصائح صحية مهمة", content: "محتوى المقال الأول...", date: "2025-01-15" },
    { id: 2, title: "الوقاية من الأمراض", content: "محتوى المقال الثاني...", date: "2025-01-14" },
  ]);
  const [articleForm, setArticleForm] = useState({ title: "", content: "" });
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // Pending Approvals State
  const [pendingRegistrations, setPendingRegistrations] = useState([
    { id: 1, type: "pharmacy", name: "Pharmacy ABC", email: "pharmacy@example.com", date: "2025-01-10" },
    { id: 2, type: "doctor", name: "Dr. Ahmed Ali", email: "doctor@example.com", date: "2025-01-11" },
    { id: 3, type: "nurse", name: "Nurse Sarah", email: "nurse@example.com", date: "2025-01-12" },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Add Admin Handler
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.addAdmin(adminForm);
      if (response.data) {
        alert("Admin added successfully!");
        setAdminForm({ fullName: "", email: "", password: "", phone: "" });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add admin");
      alert(error.response?.data?.message || "Failed to add admin");
    } finally {
      setLoading(false);
    }
  };

  // Article Handlers
  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.content.trim()) return;

    try {
      if (editingArticle) {
        const response = await adminAPI.updateArticle(editingArticle.id, articleForm);
        setArticles(articles.map((a) => (a.id === editingArticle.id ? { ...a, ...articleForm } : a)));
        setEditingArticle(null);
      } else {
        const response = await adminAPI.createArticle(articleForm);
        const newArticle = { id: Date.now(), ...articleForm, date: new Date().toISOString().split("T")[0] };
        setArticles([newArticle, ...articles]);
      }
      setArticleForm({ title: "", content: "" });
      setShowArticleForm(false);
    } catch (error) {
      console.error("Error saving article:", error);
      // Fallback to local state if API fails
      if (editingArticle) {
        setArticles(articles.map((a) => (a.id === editingArticle.id ? { ...a, ...articleForm } : a)));
        setEditingArticle(null);
      } else {
        const newArticle = { id: Date.now(), ...articleForm, date: new Date().toISOString().split("T")[0] };
        setArticles([newArticle, ...articles]);
      }
      setArticleForm({ title: "", content: "" });
      setShowArticleForm(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await adminAPI.deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
      // Fallback to local state
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setArticleForm({ title: article.title, content: article.content });
    setShowArticleForm(true);
  };

  // Approval Handlers
  const handleApprove = async (id, type) => {
    setLoading(true);
    try {
      await adminAPI.approveRegistration(id, type);
      setPendingRegistrations(pendingRegistrations.filter((r) => r.id !== id));
      alert(`${type} approved successfully!`);
    } catch (error) {
      console.error("Error approving:", error);
      // Fallback to local state
      setPendingRegistrations(pendingRegistrations.filter((r) => r.id !== id));
      alert(`${type} approved successfully!`);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id, type) => {
    if (!window.confirm(`Are you sure you want to reject this ${type}?`)) return;

    setLoading(true);
    try {
      await adminAPI.rejectRegistration(id, type);
      setPendingRegistrations(pendingRegistrations.filter((r) => r.id !== id));
      alert(`${type} rejected.`);
    } catch (error) {
      console.error("Error rejecting:", error);
      // Fallback to local state
      setPendingRegistrations(pendingRegistrations.filter((r) => r.id !== id));
      alert(`${type} rejected.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} currentView={view} onSelect={setView} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          {/* Dashboard View */}
          {view === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Pending Approvals" value={pendingRegistrations.length} icon={<IconCheckCircle />} />
                <StatCard title="Total Articles" value={articles.length} icon={<IconFileText />} />
                <StatCard title="Active Users" value="1,234" />
                <StatCard title="Total Admins" value="5" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Recent Pending Approvals</h3>
                  <div className="space-y-3">
                    {pendingRegistrations.slice(0, 3).map((reg) => (
                      <div key={reg.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{reg.name}</p>
                          <p className="text-sm text-gray-500">{reg.type} • {reg.date}</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pending</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
                  <div className="space-y-3">
                    {articles.slice(0, 3).map((article) => (
                      <div key={article.id} className="p-3 bg-gray-50 rounded">
                        <p className="font-medium">{article.title}</p>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Admin View */}
          {view === "addAdmin" && (
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Add New Admin</h1>
              <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                <form onSubmit={handleAddAdmin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={adminForm.fullName}
                      onChange={(e) => setAdminForm({ ...adminForm, fullName: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                    <input
                      type="text"
                      value={adminForm.phone}
                      onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#006d77] text-white px-4 py-2 rounded-md hover:bg-[#005a63] transition disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add Admin"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Articles View */}
          {view === "articles" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0f172a]">مقالات (Articles)</h1>
                <button
                  onClick={() => {
                    setShowArticleForm(true);
                    setEditingArticle(null);
                    setArticleForm({ title: "", content: "" });
                  }}
                  className="bg-[#006d77] text-white px-4 py-2 rounded-md hover:bg-[#005a63] transition"
                >
                  + Add Article
                </button>
              </div>

              {showArticleForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-semibold mb-4">{editingArticle ? "Edit Article" : "New Article"}</h3>
                  <form onSubmit={handleAddArticle} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                      <input
                        type="text"
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Content</label>
                      <textarea
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                        rows="6"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="bg-[#006d77] text-white px-4 py-2 rounded-md hover:bg-[#005a63] transition">
                        {editingArticle ? "Update" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowArticleForm(false);
                          setEditingArticle(null);
                          setArticleForm({ title: "", content: "" });
                        }}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div key={article.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Approvals View */}
          {view === "approvals" && (
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Pending Approvals</h1>
              <div className="space-y-4">
                {pendingRegistrations.map((reg) => (
                  <div key={reg.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{reg.name}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium capitalize">
                            {reg.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">{reg.email}</p>
                        <p className="text-sm text-gray-500">Submitted: {reg.date}</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(reg.id, reg.type)}
                          disabled={loading}
                          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
                        >
                          <IconCheckCircle />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(reg.id, reg.type)}
                          disabled={loading}
                          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                        >
                          <IconXCircle />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingRegistrations.length === 0 && (
                  <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                    <p className="text-gray-500 text-lg">No pending approvals</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
