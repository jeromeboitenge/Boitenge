export default function SkillCard({skill}:{skill:any}){
return (
<div className="p-4 bg-white rounded-lg shadow">
<h4 className="font-semibold">{skill.title}</h4>
<ul className="mt-2 text-sm text-gray-600">
{skill.items.map((it:string)=> <li key={it}>• {it}</li>)}
</ul>
</div>
)
}