const { NavLink, Route } = ReactRouterDOM
import { eventBus } from "../services/eventBusService.js";



function AboutEffort() {
    return <section>
        <h2>Our Effort</h2>
        <p>Effort is Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis inventore reiciendis, nostrum quos ipsam nulla consequuntur explicabo ducimus ea temporibus in, aut numquam cumque quisquam quo quibusdam dolorum, modi ad?</p>
    </section>
}
function AboutTeam() {
    return <section>
        <h2>Our Team is the Best</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis inventore reiciendis, nostrum quos ipsam nulla consequuntur explicabo ducimus ea temporibus in, aut numquam cumque quisquam quo quibusdam dolorum, modi ad?</p>
    </section>
}
class AboutServices extends React.Component {

    constructor() {
        super();
        this.myMap = React.createRef();
        this.userPlace = React.createRef();
    }
    componentDidMount() {
        // AVOID using querySelector in React
        const el = document.querySelector('#map')
        console.log('Lets make a map here:', el, this.myMap.current);
        this.userPlace.current.focus();

    }
    render() {
        return <section>
            <h2>Our Services Are everywhere</h2>
            <div id="map" ref={this.myMap} onClick={
                () => {
                    this.userPlace.current.focus()
                    eventBus.emit('show-msg', { txt: 'Your are a great Map Clicker!' })
                }
            } >

            </div>
            <input type="text" placeholder="Your Place" ref={this.userPlace} />
            <p>Services ARE Great, Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis inventore reiciendis, nostrum quos ipsam nulla consequuntur explicabo ducimus ea temporibus in, aut numquam cumque quisquam quo quibusdam dolorum, modi ad?</p>
        </section>

    }
}
export default function AboutUs() {
    return <section>
        <h1>About Us</h1>
        <NavLink exact to="/about">Our Team</NavLink>|
        <NavLink exact to="/about/effort">Our Effort</NavLink>|
        <NavLink to="/about/services">Our Services</NavLink>

        <Route exact component={AboutTeam} path="/about" />
        <Route component={AboutServices} path="/about/services" />
        <Route component={AboutEffort} path="/about/effort" />
    </section>
}