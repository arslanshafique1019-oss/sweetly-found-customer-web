import React, { useState } from "react";

export default function AddAddressForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ label: "", name: "", line1: "", line2: "", city: "", state: "", zip: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.label.trim() || !form.line1.trim() || !form.city.trim()) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-maroon-100 rounded-xl p-3 sm:p-4 space-y-3 bg-blush-50">
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
        <Input placeholder="Label (e.g. Home)" value={form.label} onChange={set("label")} required />
        <Input placeholder="Full Name" value={form.name} onChange={set("name")} />
      </div>
      <Input placeholder="Address Line 1" value={form.line1} onChange={set("line1")} required />
      <Input placeholder="Address Line 2 (optional)" value={form.line2} onChange={set("line2")} />
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
        <Input placeholder="City" value={form.city} onChange={set("city")} required />
        <Input placeholder="State" value={form.state} onChange={set("state")} />
        <Input placeholder="ZIP" value={form.zip} onChange={set("zip")} />
      </div>
      <div className="flex items-center gap-2 pt-1">
        <button type="submit" className="btn-primary !py-2 !px-5 text-xs">
          Save Address
        </button>
        <button type="button" onClick={onCancel} className="text-xs font-medium text-maroon-900/50 hover:text-maroon-700 px-3">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full bg-white border border-maroon-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-maroon-700 transition-colors placeholder:text-maroon-900/40"
    />
  );
}
