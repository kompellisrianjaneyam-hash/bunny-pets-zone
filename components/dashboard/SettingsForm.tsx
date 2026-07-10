"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import {
  getSettings,
  updateSettings,
  type Settings,
} from "@/lib/settings";

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Settings>({
    id: "",
    business_name: "",
    phone: "",
    whatsapp: "",
    address: "",
    business_hours: "",
    working_days: "",
    google_maps: "",
    logo_url: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();

        if (data) {
          setForm(data);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateSettings({
        business_name: form.business_name,
        phone: form.phone,
        whatsapp: form.whatsapp,
        address: form.address,
        business_hours: form.business_hours,
        working_days: form.working_days,
        google_maps: form.google_maps,
        logo_url: form.logo_url,
      });

      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg space-y-6">

      <h2 className="text-2xl font-bold text-[#2F2017]">
        Business Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold">
            Business Name
          </label>

          <input
            name="business_name"
            value={form.business_name}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            WhatsApp
          </label>

          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Business Hours
          </label>

          <input
            name="business_hours"
            value={form.business_hours}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Address
        </label>

        <textarea
          rows={3}
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Working Days
        </label>

        <input
          name="working_days"
          value={form.working_days}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Google Maps URL
        </label>

        <input
          name="google_maps"
          value={form.google_maps}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Logo URL
        </label>

        <input
          name="logo_url"
          value={form.logo_url}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-[#D59A3A] px-6 py-3 font-semibold text-white hover:bg-[#c78d2f] disabled:opacity-60"
      >
        <Save size={18} />

        {saving ? "Saving..." : "Save Changes"}
      </button>

    </div>
  );
}