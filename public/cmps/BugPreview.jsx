const { Link } = ReactRouterDOM


export default function BugPreview(props) {
    const { bug, onDelete } = props
    return (
        <article className="bug-preview">
            <img src={ `https://robohash.org/${bug._id}` } alt="" />
            <p>Title: { bug.title }</p>
            <p>Severity: { bug.severity }</p>
            <Link to={`/bug/${bug._id}`}>Details</Link> |
            <Link to={`/bug/edit/${bug._id}` }>Edit</Link> | 
            <button onClick={()=>{
                onDelete(bug._id)
            }}>X</button>
        </article>
    )
}