// src/lib/utils.js
// Utility function for merging Tailwind CSS classes.
// This is typically part of a shadcn/ui setup.
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
