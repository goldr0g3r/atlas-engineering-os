export function finite(value: unknown) { const n=Number(value); return Number.isFinite(n)?n:0; }
export function pct(done:number,total:number){return total>0?Math.round((done/total)*100):0}
export function isoDay(value:unknown){return typeof value==="string"&&/^\d{4}-\d{2}-\d{2}/.test(value)?value.slice(0,10):""}
export function todayIso(){return new Date().toISOString().slice(0,10)}
export function isClosed(status:unknown){return ["done","completed","closed","paid"].includes(String(status??"").toLowerCase())}
