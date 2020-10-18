const { Link } = ReactRouterDOM


// Not Good, we should relay on prev state like this:
// this.setState({isExpanded : !this.state.isExpanded})
// This is fine:
// this.setState((prevState)=>{
//     return {
//         isExpanded : !prevState.isExpanded
//     }
// })
// This is Shorter:
// this.setState(({isExpanded})=>{
//     return {
//         isExpanded : !isExpanded
//     }
// })
// This is Best:
// this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))


export default class BugTableRow extends React.Component {
    state = { isExpanded: false }
    render() {
        const { bug } = this.props
        return (
            <React.Fragment>
                <tr onClick={() => {
                    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))
                }}>
                    {/* <td>{bug.vendor}</td> */}
                    <td>{bug.title}</td>
                    <td>
                        <Link to={`/bug/${bug._id}`}>Details</Link> |
                        <Link to={`/bug/edit/${bug._id}`}>Edit</Link>
                    </td>
                </tr>
                <tr hidden={!this.state.isExpanded}>
                    <td colSpan="3">
                        <img src={`https://robohash.org/${bug._id}`} />
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}