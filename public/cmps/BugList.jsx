import BugPreview from './BugPreview.jsx'
export default function BugList(props) {
    return (
        <div className="bug-list">
            { props.bugs.map(bug => <BugPreview key={ bug._id } bug={ bug } onDelete={props.onDelete} />) }
        </div>
    )
}