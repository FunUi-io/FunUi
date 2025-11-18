// utils/getDynamicIcon.ts
import React from "react";

const iconPacks: Record<string, () => Promise<any>> = {
  fa: () => import("react-icons/fa"),
  pi: () => import("react-icons/pi"),
  md: () => import("react-icons/md"),
  io: () => import("react-icons/io5"),
  bi: () => import("react-icons/bi"),
  ai: () => import("react-icons/ai"),
};

export async function getDynamicIcon(iconName: string): Promise<React.ReactNode | null> {
  try {
    // Get prefix (e.g. "Pi" from "PiX")
    const prefix = iconName.slice(0, 2).toLowerCase();
    const loader = iconPacks[prefix];
    if (!loader) return null;

    const pack = await loader();
    const Icon = pack[iconName];
    if (!Icon) return null;

    return <Icon />;
  } catch (err) {
    console.error(`Failed to load icon: ${iconName}`, err);
    return null;
  }
}
