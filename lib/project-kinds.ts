export const workStatuses=["backlog","ready","in-progress","review","blocked","done","cancelled"] as const;
export const workTypes=["task","feature","bug","requirement","experiment","action"] as const;
export const priorities=["low","medium","high","critical"] as const;
export function enumValue<T extends readonly string[]>(value:unknown,allowed:T,fallback:T[number]):T[number]{return typeof value==="string"&&allowed.includes(value as T[number])?value as T[number]:fallback;}
