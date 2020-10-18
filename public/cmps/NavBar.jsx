const { NavLink } = ReactRouterDOM

export function NavBar(props) {
    return <nav>
        <ul>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/bug'>Our Bugs</NavLink></li>
        </ul>
        <button onClick={() => {
            props.history.goBack();
        }}>Back</button>
    </nav>
}