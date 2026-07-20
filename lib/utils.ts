import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nowIso() {
  return new Date().toISOString();
}

export function parseTags(input: unknown): string[] {
  if (Array.isArray(input)) return input.map(String).map((v) => v.trim()).filter(Boolean);
  if (typeof input !== "string") return [];
  return input.split(",").map((v) => v.trim()).filter(Boolean);
}

export function safeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
