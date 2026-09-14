import supabase from "./supabase";

const SETTINGS_STORAGE_KEY = "wild-oasis-settings";

function readStoredSettings() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeStoredSettings(settings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }
}

export async function getSettings() {
  try {
    const { data, error } = await supabase.from("settings").select("*").single();

    if (error) throw error;
    if (data) {
      writeStoredSettings(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    const storedSettings = readStoredSettings();
    if (storedSettings) return storedSettings;
    throw new Error("Settings could not be loaded");
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const normalizedSetting = Object.fromEntries(
    Object.entries(newSetting).map(([key, value]) => {
      const parsedValue = Number(value);
      return [key, Number.isNaN(parsedValue) ? value : parsedValue];
    })
  );

  try {
    const { data, error } = await supabase
      .from("settings")
      .update(normalizedSetting)
      // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
      .eq("id", 1)
      .select("*")
      .maybeSingle();

    let updatedSetting = data;

    if (error?.code === "PGRST116") {
      const { data: existingSetting, error: fetchError } = await supabase
        .from("settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (fetchError) {
        console.error(fetchError);
      } else {
        updatedSetting = existingSetting;
      }
    }

    if (!updatedSetting) {
      const storedSettings = readStoredSettings() || { id: 1 };
      updatedSetting = { ...storedSettings, ...normalizedSetting, id: 1 };
      writeStoredSettings(updatedSetting);
      return updatedSetting;
    }

    writeStoredSettings(updatedSetting);
    return updatedSetting;
  } catch (error) {
    console.error(error);
    const storedSettings = readStoredSettings() || { id: 1 };
    const fallbackSettings = { ...storedSettings, ...normalizedSetting, id: 1 };
    writeStoredSettings(fallbackSettings);
    return fallbackSettings;
  }
}
