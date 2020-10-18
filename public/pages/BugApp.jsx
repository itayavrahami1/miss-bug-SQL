const { Link } = ReactRouterDOM


import bugService from '../services/bugService.js'
import BugTable from '../cmps/BugTable.jsx'
import BugList from '../cmps/BugList.jsx'
import BugFilter from '../cmps/BugFilter.jsx'

export default class BugApp extends React.Component {
    state = {
        bugs: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadBugs()
    }
    loadBugs() {
        bugService.query(this.state.filterBy)
            .then(bugs => {
                this.setState({ bugs })
            })

    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadBugs())
    }
    onDelete = (bugId) => {
        bugService.remove(bugId)
            .then(() => {
                this.loadBugs()
            })
    }

    render() {
        const { bugs } = this.state
        return (
            <section>
                <Link to="/bug/add">Add Bug</Link>
                {<BugFilter onSetFilter={this.onSetFilter} />}
                {bugs &&
                    <BugList bugs={bugs} onDelete={this.onDelete} />}
                {bugs &&
                    <BugTable bugs={bugs} />}
            </section>
        )
    }
}