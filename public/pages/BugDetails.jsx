import bugService from "../services/bugService.js"

const { Link } = ReactRouterDOM


export default class BugDetails extends React.Component {

    state = {
        bug: null
    }

    componentDidMount() {
        console.log('MOUNT');
        this.prevNext = bugService.getNextPrevBugs();
        this.loadBug();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.theBugId !== this.props.match.params.theBugId) {
            console.log('Route changed, so we should load the new bug');
            this.loadBug();
        }
     }

     loadBug() {
        const id = this.props.match.params.theBugId
        bugService.getById(id)
        .then(bug => {
            this.setState({bug})
        })
     }

     
    removeBug = () => {
        bugService.remove(this.state.bug._id)
            .then(()=>{
                console.log('Bug was removed');
                this.props.history.push('/bug')
            })
            .catch(err => {
                alert('OOPs, try again');
                console.log('ERR:', err);
            })

    }

    render() {
        const { bug } = this.state

        const Loading = <p>Loading...</p>

        return ((!bug)? Loading : <div>
                <h2>Welcome to the { bug.title } page!</h2>
                <img src={ `https://robohash.org/${bug.title}` } alt="" />
                <p>Id - { bug._id }</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia aut dolorum culpa impedit et perferendis expedita repudiandae ex quam quas quod possimus, dignissimos tempore autem officia voluptatibus accusamus corrupti alias!</p>
                <button onClick={this.removeBug}>Delete</button>
                <hr/>
                <div className="center">
                    <Link to={`/bug/${this.prevNext.prevId}`}>Prev</Link> | 
                    <Link to={`/bug/${this.prevNext.nextId}`}>Next</Link>
                </div>
            </div>)
        
    }
}