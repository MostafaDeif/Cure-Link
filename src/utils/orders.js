// Simple local orders utility using localStorage
const STORAGE_KEY = "cl_orders_v1";

export function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveOrders(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {}
}

function genId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export function addOrder(order) {
  const existing = getOrders() || [];
  const newOrder = {
    id: genId(),
    date: new Date().toISOString().split("T")[0],
    status: "active",
    ...order,
  };
  const next = [newOrder, ...existing];
  saveOrders(next);
  // return the created order for convenience
  return newOrder;
}

export function clearOrders() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export default { getOrders, addOrder, saveOrders, clearOrders };
