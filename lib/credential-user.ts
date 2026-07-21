import { getCollection } from "@/lib/collections";

export const normalizeEmail = (value: string) => value.trim().toLowerCase();
export const normalizeUsername = (value: string) => value.trim().toLowerCase();

export function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export function validUsername(value: string) {
  return /^[a-z0-9][a-z0-9._-]{2,31}$/.test(value);
}
export function validPassword(value: string) {
  return value.length >= 12 && value.length <= 128;
}

let indexPromise: Promise<unknown> | undefined;
export function ensureCredentialIndexes() {
  return indexPromise ??= Promise.all([
    getCollection("credentialUsers").then(c => c.createIndex({ email: 1 }, { unique: true, name: "credential_email_unique" })),
    getCollection("credentialUsers").then(c => c.createIndex({ username: 1 }, { unique: true, name: "credential_username_unique" })),
  ]);
}
