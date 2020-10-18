const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
const history = History.createBrowserHistory()

import {NavBar} from './cmps/NavBar.jsx';

import BugApp from './pages/BugApp.jsx'
import BugDetails from './pages/BugDetails.jsx';
import BugEdit from './pages/BugEdit.jsx';
import AboutUs from './pages/AboutUs.jsx';
import HomePage from './pages/HomePage.jsx';

export class App extends React.Component {

    render() {
        return (
            <Router >
                <header>
                    <h1>Bugs R LIFE!!</h1>
                    <NavBar history={history}></NavBar>
                </header>
                <main>
                    <Switch>
                        <Route component={BugEdit} path="/bug/add" />
                        <Route component={BugEdit} path="/bug/edit/:theBugId" />
                        <Route component={BugDetails} path="/bug/:theBugId" />
                        <Route component={BugApp} path="/bug" />
                        <Route component={AboutUs} path="/about" />
                        <Route component={HomePage} path="/" />
                    </Switch>
                </main>
                <footer>
                    coffeerights 2020 &copy;
                </footer>
            </Router>
        )
    }
}