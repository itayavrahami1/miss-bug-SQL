import BugTableRow from './BugTableRow.jsx'
export default function BugList(props) {
    return (
        <table className="bug-table" border="1">
            <tbody>
                { props.bugs.map(bug => <BugTableRow key={ bug._id } bug={ bug } />) }
            </tbody>
        </table>
    )
}