import { supabase } from "./supabase";

export type Settings = {
  id: string;
  business_name: string;
  phone: string;
  whatsapp: string;
  address: string;
  business_hours: string;
  working_days: string;
  google_maps: string;
  logo_url: string;
};

function handleError(error: { message: string } | null, action: string) {
  if (error) {
    throw new Error(`${action}: ${error.message}`);
  }
}

export async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  handleError(error, "Failed to fetch settings");

  return data as Settings;
}

export async function updateSettings(
  values: Partial<Settings>
) {
  const settings = await getSettings();

  const { data, error } = await supabase
    .from("settings")
    .update(values)
    .eq("id", settings.id)
    .select()
    .single();

  handleError(error, "Failed to update settings");

  return data as Settings;
}