import ProjectCard from './ProjectCard'


const sample = [
{title:'Hotel System', desc:'Hotel ops & booking', tech:['React','Node'], img:'/projects/hotel.png', github:'#', demo:'#'},
{title:'HitamoSpace', desc:'Event management', tech:['Next','NestJS'], img:'/projects/event.png', github:'#', demo:'#'},
{title:'ExploreHub', desc:'Tourism app', tech:['React','MongoDB'], img:'/projects/tourism.png', github:'#', demo:'#'}
]


export default function ProjectsPreview(){
return (
<div className="grid md:grid-cols-3 gap-6">
{sample.map(p=> <ProjectCard key={p.title} project={p} />)}
</div>
)
}