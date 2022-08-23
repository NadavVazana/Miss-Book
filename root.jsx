import { BookApp } from "./views/book-app.jsx"
import { BookDetails } from "./views/book-details.jsx"
import { Home } from "./comps/home-page.jsx"
import { About } from "./comps/about.jsx"
import { AppHeader } from "./comps/app-header.jsx"
import { AddBook } from "./comps/add-book.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router> 
        <section className="app">
        
        <AppHeader/>
        <Switch>
            <Route path="/book/:bookId" component={BookDetails} />
            <Route path="/addbook" component={AddBook}/>
            <Route path="/book" component={BookApp}/>
            <Route path="/about" component={About}/>
            <Route path="/" component={Home}/>
        </Switch>
    </section>
        </Router>
}