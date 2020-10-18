export default class Filter extends React.Component {
    state = {
        filter: {
            title: '',
            severity: '',
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }
    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }
    render() {
        const { title, severity } = this.state.filter
        return (
            <React.Fragment>
                <h1>Filter:</h1>
                <form onSubmit={ this.onFilter }>
                    <label htmlFor="">By Title</label>
                    <input type="text" name='title' value={ title } onChange={ this.handleChange } />
                    <label htmlFor="">By severity</label>
                    <input type="number" name='severity' value={ severity } onChange={ this.handleChange } />
                    <button>Filter</button>
                </form>
            </React.Fragment>
        )
    }
}