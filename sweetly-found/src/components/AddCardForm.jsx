import React, { useState } from "react";

const BRANDS = ["Visa", "Mastercard", "Amex", "Discover"];

export default function AddCardForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ brand: "Visa", number: "", expiry: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = form.number.replace(/\s/g, "");
    if (digits.length < 4) {
      setError("Enter at least the last 4 digits of the card.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      setError("Expiry should be in MM/YY format.");
      return;
    }
    onSave({ brand: form.brand, last4: digits.slice(-4), expiry: form.expiry });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-maroon-100 rounded-xl p-3 sm:p-4 space-y-3 bg-blush-50 max-w-lg">
      <div className="grid grid-cols-2 gap-3">
        <select
          value={form.brand}
          onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
          className="w-full bg-white border border-maroon-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-maroon-700 transition-colors"
        >
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <input
          placeholder="MM/YY"
          value={form.expiry}
          onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))}
          maxLength={5}
          className="w-full bg-white border border-maroon-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-maroon-700 transition-colors placeholder:text-maroon-900/40"
        />
      </div>
      <input
        placeholder="Card Number"
        value={form.number}
        onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
        maxLength={19}
        className="w-full bg-white border border-maroon-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-maroon-700 transition-colors placeholder:text-maroon-900/40"
      />
      {error && <p className="text-xs text-maroon-700">{error}</p>}
      <div className="flex items-center gap-2 pt-1">
        <button type="submit" className="btn-primary !py-2 !px-5 text-xs">
          Save Card
        </button>
        <button type="button" onClick={onCancel} className="text-xs font-medium text-maroon-900/50 hover:text-maroon-700 px-3">
          Cancel
        </button>
      </div>
    </form>
  );
}
