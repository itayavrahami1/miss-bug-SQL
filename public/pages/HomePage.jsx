import bugService from "../services/bugService.js";

export default class HomePage extends React.Component {

    onSetUser = (ev) => {
        // ADD USERSERVICE - AND THEN USER.JSON IN BACKEND
        ev.preventDefault()
        const nickName = ev.target.nickName.value;
        bugService.setUser(nickName)
        .then(()=>{
            this.props.history.push('/bug')
        })
    }

    render() {

        return (<section>
            <h1>Welcome To Bugs Life</h1>
            <form onSubmit={this.onSetUser}>
                <input type="text" name="nickName" placeholder="Your user name" />
                <button>Submit</button>
            </form>
            <hr />
        </section>
        )
    }
}



