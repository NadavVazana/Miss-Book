import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'
const {Link} = ReactRouterDOM

export class UserMsg extends React.Component {
    unsubscribe
    state = {
        animation:true,
        msg: null
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg })
            this.setState({animation : true})
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
    
    closeMsg = () => {
        this.setState({animation:false})
    }

    getBookId = () =>{
        const id = bookService.getLastBookId()
        return id
    }

    render() {
        const { msg , animation} = this.state
        const { closeMsg } = this
        const animationClass = animation ? 'animate__backInDown' : 'animate__backOutUp'
        if (!msg) return <span></span>
        
        return (
            <section className={`user-msg ${msg.type}  animate__animated ${animationClass}` }>
                <button onClick={closeMsg}>x</button>
                {msg.txt} <br />
                <Link className="msg-link" to={`/book/${this.getBookId()}`}>To the book page!</Link>
            </section>
        )
    }
}
