import { useEffect, useState } from "react";
import { getOrders } from "../../../utils/orders";

const sampleOrders = [
  {
    id: 101,
    title: "طلب رعاية منزلية",
    date: "2024-06-10",
    status: "active",
    total: 250,
    nurse: "أحمد علي",
    address: "شارع النيل 12، القاهرة",
    items: ["زيارة ممرضة", "أدوية موضعية"],
  },
  {
    id: 102,
    title: "أدوية ووصفات",
    date: "2024-05-30",
    status: "completed",
    total: 120,
    nurse: "—",
    address: "شارع الملك، الجيزة",
    items: ["دواء أ", "دواء ب"],
  },
];

const orderStatusColors = {
  active: "text-blue-600 bg-blue-100",
  completed: "text-green-600 bg-green-100",
  cancelled: "text-red-600 bg-red-100",
};

const orderStatusLabels = {
  active: "قيد التنفيذ",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export default function OrdersSection() {
  const [orders, setOrders] = useState(sampleOrders);
  useEffect(() => {
    const stored = getOrders();
    if (Array.isArray(stored) && stored.length > 0) setOrders(stored);
  }, []);

  const [activeOrderId, setActiveOrderId] = useState(() =>
    (orders.find((o) => o.status === "active") && orders.find((o) => o.status === "active").id) || (orders[0] && orders[0].id)
  );

  // If orders change (e.g. a new pharmacy order was added), ensure activeOrderId points
  // to an existing order. This prevents the UI from showing no active order and appearing
  // like the new order disappeared.
  useEffect(() => {
    if (!orders || orders.length === 0) return;
    const exists = orders.some((o) => o.id === activeOrderId);
    if (!exists) {
      // prefer the first 'active' status order, otherwise the most recent
      const preferred = orders.find((o) => o.status === "active") || orders[0];
      setActiveOrderId(preferred.id);
    }
  }, [orders, activeOrderId]);

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0];
  const lastOrders = orders.filter((o) => o.id !== activeOrderId);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">طلباتي</h3>

      {activeOrder && (
        <div className="bg-white p-4 md:p-6 rounded shadow mb-6 border border-gray-100">
          <h4 className="text-lg font-semibold">
            تفاصيل طلب: {activeOrder.title}
          </h4>

          <div className="text-sm text-gray-500 mt-1">{activeOrder.date}</div>
          <div className="text-gray-600 mt-2">{activeOrder.address}</div>

          <span
            className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${orderStatusColors[activeOrder.status]}`}
          >
            {orderStatusLabels[activeOrder.status]}
          </span>

          <div className="mt-4 text-sm text-gray-700">
            <div className="font-medium mb-1">محتويات الطلب:</div>
            <ul className="list-disc list-inside">
              {activeOrder.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <h4 className="text-lg font-semibold mb-3">آخر الطلبات</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lastOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setActiveOrderId(order.id)}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
          >
            <div className="font-semibold text-blue-700">{order.title}</div>
            <div className="text-sm text-gray-500">{order.date}</div>
            <div className="text-xs text-gray-600 mt-1">{order.address}</div>

            <span
              className={`mt-2 px-3 py-1 inline-block rounded-full text-xs font-medium ${orderStatusColors[order.status]}`}
            >
              {orderStatusLabels[order.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
