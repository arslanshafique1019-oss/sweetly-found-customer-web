import React, { createContext, useContext, useState, useCallback } from "react";
import { savedAddresses, savedPaymentMethods } from "../data/products";

const AccountContext = createContext(null);

let addressIdSeq = Math.max(0, ...savedAddresses.map((a) => a.id)) + 1;
let paymentIdSeq = Math.max(0, ...savedPaymentMethods.map((p) => p.id)) + 1;

export function AccountProvider({ children }) {
  const [addresses, setAddresses] = useState(savedAddresses);
  const [paymentMethods, setPaymentMethods] = useState(savedPaymentMethods);

  const addAddress = useCallback((addr) => {
    const newAddr = { ...addr, id: addressIdSeq++, isDefault: false };
    setAddresses((prev) => [...prev, newAddr]);
    return newAddr;
  }, []);

  const removeAddress = useCallback((id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const addPaymentMethod = useCallback((pm) => {
    const newPm = { ...pm, id: paymentIdSeq++, isDefault: false };
    setPaymentMethods((prev) => [...prev, newPm]);
    return newPm;
  }, []);

  const removePaymentMethod = useCallback((id) => {
    setPaymentMethods((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = { addresses, addAddress, removeAddress, paymentMethods, addPaymentMethod, removePaymentMethod };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within an AccountProvider");
  return ctx;
}
