import supabase, { supabaseUrl } from "./supabase";

const CABINS_STORAGE_KEY = "wild-oasis-cabins";

function readStoredCabins() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CABINS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeStoredCabins(cabins) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CABINS_STORAGE_KEY, JSON.stringify(cabins));
  }
}

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) throw error;
    if (data) {
      writeStoredCabins(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    const storedCabins = readStoredCabins();

    if (storedCabins.length) return storedCabins;
    throw new Error("Cabins could not be loaded");
  }
}

export async function createEditCabin(newCabin, id) {
  const normalizedCabin = {
    ...newCabin,
    maxCapacity: Number(newCabin.maxCapacity),
    regularPrice: Number(newCabin.regularPrice),
    discount: Number(newCabin.discount || 0),
  };

  const hasImagePath = normalizedCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${normalizedCabin.image?.name ?? "cabin-image"}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? normalizedCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  try {
    // 1. Create/edit cabin
    let query = supabase.from("cabins");

    // A) CREATE
    if (!id) query = query.insert([{ ...normalizedCabin, image: imagePath }]);

    // B) EDIT
    if (id) query = query.update({ ...normalizedCabin, image: imagePath }).eq("id", id);

    const { data, error } = id
      ? await query.select().maybeSingle()
      : await query.select().single();

    let cabinData = data;

    if (error?.code === "PGRST116" && id) {
      const { data: existingCabin, error: fetchError } = await supabase
        .from("cabins")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (fetchError) {
        console.error(fetchError);
      } else {
        cabinData = existingCabin;
      }
    }

    if (!cabinData) {
      const storedCabins = readStoredCabins();
      if (id) {
        const index = storedCabins.findIndex((cabin) => cabin.id === id);
        if (index >= 0) {
          storedCabins[index] = {
            ...storedCabins[index],
            ...normalizedCabin,
            image: imagePath,
            id,
          };
          writeStoredCabins(storedCabins);
          return storedCabins[index];
        }
      }

      const newCabin = {
        id: id ?? Date.now(),
        ...normalizedCabin,
        image: imagePath,
      };
      writeStoredCabins([...storedCabins, newCabin]);
      return newCabin;
    }

    // 2. Upload image
    if (hasImagePath || !normalizedCabin.image) {
      const storedCabins = readStoredCabins();
      const nextCabins = id
        ? storedCabins.map((cabin) => (cabin.id === cabinData.id ? cabinData : cabin))
        : [...storedCabins, cabinData];
      writeStoredCabins(nextCabins);
      return cabinData;
    }

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, normalizedCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", cabinData.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }

    const storedCabins = readStoredCabins();
    const nextCabins = id
      ? storedCabins.map((cabin) => (cabin.id === cabinData.id ? cabinData : cabin))
      : [...storedCabins, cabinData];
    writeStoredCabins(nextCabins);

    return cabinData;
  } catch (error) {
    console.error(error);
    const storedCabins = readStoredCabins();
    const fallbackCabin = id
      ? storedCabins.find((cabin) => cabin.id === id)
      : {
          id: Date.now(),
          ...normalizedCabin,
          image: imagePath,
        };

    if (id && fallbackCabin) {
      const nextCabins = storedCabins.map((cabin) =>
        cabin.id === id ? { ...fallbackCabin, ...normalizedCabin, image: imagePath } : cabin
      );
      writeStoredCabins(nextCabins);
      return nextCabins.find((cabin) => cabin.id === id);
    }

    if (!id) {
      const nextCabins = [...storedCabins, fallbackCabin];
      writeStoredCabins(nextCabins);
      return fallbackCabin;
    }

    return fallbackCabin;
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
