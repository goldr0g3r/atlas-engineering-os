"use client";
import{useState}from"react";import{useRouter}from"next/navigation";import{CreateBomItemForm}from"@/components/create-bom-item-form";import{EditDeleteActions}from"@/components/edit-delete-actions";
export function BomItemRow({item,projectId,bomId}:{item:any;projectId:string;bomId:string}){const router=useRouter();const[editing,setEditing]=useState(false);
if(editing)return<tr><td colSpan={7} className="p-3"><CreateBomItemForm projectId={projectId} bomId={bomId} item={item} onClose={()=>setEditing(false)}/></td></tr>;
return<tr className="border-b border-white/5"><td className="p-3">{item.partName}</td><td>{item.partNumber}</td><td>{item.supplier}</td><td>{item.quantity} {item.unit}</td><td>{item.currency} {item.unitCost}</td><td>{item.status}</td><td><EditDeleteActions
onEdit={()=>setEditing(true)}
onDelete={async()=>{await fetch(`/api/projects/${projectId}/boms/${bomId}/items/${item._id}`,{method:"DELETE"});router.refresh()}}
label={item.partName}
/></td></tr>}
