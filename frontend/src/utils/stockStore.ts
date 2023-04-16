import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StockStateType {
  stock: Array<{ id: string; qty: number }>;
  increaseStock: (qty: number, id: string) => void;
  removeStockProduct: (id: string) => void;
}

function stockUpdate(
  currentStock: StockStateType["stock"],
  qty: number,
  id: string
) {
  let prevData = { id: "", qty: 0, index: 0 };
  currentStock.forEach((i, n) => {
    if (i.id === id) {
      prevData = {
        id: i.id,
        qty: i.qty,
        index: n,
      };
    }
  });

  if (prevData.id) {
    currentStock[prevData.index] = { qty: prevData.qty + qty, id: prevData.id };
    return [...currentStock];
  } else {
    return [...currentStock, { id, qty }];
  }
}

function deleteProduct(currentStock: StockStateType["stock"], id: string) {
  return currentStock.filter((i) => i.id !== id);
}

const useStockStore = create<StockStateType>()(
  persist(
    (set) => ({
      stock: [],
      increaseStock: (qty, id) =>
        set((state) => ({ stock: stockUpdate(state.stock, qty, id) })),
      removeStockProduct: (id) =>
        set((state) => ({ stock: deleteProduct(state.stock, id) })),
    }),
    { name: "product-stock" }
  )
);

export { useStockStore };
