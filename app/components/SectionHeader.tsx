export default function SectionHeader({title, sub}:{title:string, sub?:string}){
return (
<div className="text-center mb-6">
<h2 className="text-2xl font-bold">{title}</h2>
{sub && <p className="text-gray-600 mt-1">{sub}</p>}
</div>
)
}