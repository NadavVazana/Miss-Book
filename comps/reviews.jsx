import { bookService } from "../services/book.service.js"
const { withRouter } = ReactRouterDOM
export class _Reviews extends React.Component {
    state = {
        rate: 1,
        name: null,
        area: null,
        date: null,
        reviews: []
    }

    inputRef = React.createRef()
    componentDidMount() {
        this.loadReviews()
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.bookId !== this.props.match.params.bookId)
        this.loadReviews()
    }
    loadReviews = () => {
        bookService.getBookById(this.props.match.params.bookId)
            .then(book => {
                if(!book.reviews) {
                    this.setState({ reviews: [] })
                }
                else{
                    this.setState({ reviews: book.reviews })
                }
            })



    }
    onAddReview = (ev) => {
        ev.preventDefault()
        const { rate, name, area, date } = this.state
        bookService.addReview(this.props.match.params.bookId, rate, name, area, date)
            .then(reviewsList => this.setState((prevState) => ({
                reviews:
                    [...prevState.reviews, reviewsList[reviewsList.length - 1]]
            })))



    }

    onRemoveReview = (reviewId, ev) => {

        const bookId = this.props.match.params.bookId
        bookService.removeReview(bookId, reviewId)
        .then(reviews => this.setState({reviews:[...reviews]}))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(() => ({
            [field]: value
        }))
    }

    goRate = () => {
        this.inputRef.current.focus()
    }

    render() {
        const { reviews } = this.state
        if(!reviews) return
        return <section>
            <form className="reviews" onSubmit={this.onAddReview} >
            <h1>Rate the book!</h1>
                <input required ref={this.inputRef} name="name" onChange={this.handleChange} type="text" placeholder="enter your name.." />
                Rate:<select name="rate" onChange={this.handleChange} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                Tell us what you think of the book:<textarea onChange={this.handleChange} name="area" cols="20" rows="3"></textarea>
                Read at:<input required name="date" onChange={this.handleChange} type="date" />
                <button>Submit</button>


                <table className="review-table">
                    <thead>
                        <tr>
                            <td>Remove review</td>
                            <td>Name:</td>
                            <td>Rate:</td>
                            <td>Review:</td>
                            <td>Read at:</td>

                        </tr>

                    </thead>
                    <tbody>
                        {this.state.reviews.map(review => {
                            return <tr key={review.id} >
                                <td><button type="button" onClick={() => { this.onRemoveReview(review.id) }}>X</button></td>
                                <td>{review.name}</td>
                                <td className="rate">{review.rate}</td>
                                <td>{review.area}</td>
                                <td>{review.date}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </form>


            <button onClick={this.goRate} className="rate-book">Rate the book!</button>
        </section>
    }
}

export const Reviews = withRouter(_Reviews)