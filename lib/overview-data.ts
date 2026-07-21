export const num=(v:unknown)=>{const n=Number(v);return Number.isFinite(n)?n:0};
export const closed=(v:unknown)=>["done","completed","closed","paid"].includes(String(v??"").toLowerCase());
export const day=(v:unknown)=>typeof v==="string"&&/^\d{4}-\d{2}-\d{2}/.test(v)?v.slice(0,10):"";
