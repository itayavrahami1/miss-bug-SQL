import bugService from "../services/bugService.js"

export default class BugEdit extends React.Component {
    state = {
        bug: {
            title: '',
            severity: ''
        }
    }

    componentDidMount() {
        const bugId = this.props.match.params.theBugId

        if (bugId) {
            bugService.getById(bugId)
                .then(bug => {
                    this.setState({ bug })
                })
        }
    }

    handleInput = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                bug: {
                    ...prevState.bug,
                    [field]: value
                }
            }
        })
    }
    onSaveBug = (ev) => {
        ev.preventDefault()
        bugService.save(this.state.bug)
            .then(savedBug => {
                console.log('Bug succesfuly saved:', savedBug);
                this.props.history.push('/bug')
            })
            .catch(err => {
                console.log('OOPs', err);
            })
    }

    render() {
        const { bug } = this.state
        return (
            <div>
                <h1>Add Bug:</h1>
                <form onSubmit={this.onSaveBug}>
                    <label>Title</label>
                    <input autoFocus type="text" value={bug.Title} onChange={this.handleInput} name="title" />
                    <label>Severity</label>
                    <input type="number" value={bug.Severity} placeholder='Bug Severity' onChange={this.handleInput} name="severity" />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}
