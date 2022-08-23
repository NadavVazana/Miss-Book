

export class BookFilter extends React.Component{
    state = {
        filterBy: {
            title: '',
            price:''
        }
    }
    handleInput = ({target}) =>{
        const value = target.type ==='number' ? +target.value : target.value
        const field = target.name
        this.setState(prevState =>({
            filterBy:{
                ...prevState.filterBy,
                [field] : value

            }
        }),()=>{this.props.onSetFilter(this.state.filterBy)})
    }
    render(){

        const {title,price} = this.state.filterBy
        return <section className="book-filter">
              <form className="book-filters">
                <label htmlFor="by title" >
                Title: <input name="title" onChange={this.handleInput} value={title}  id="by title" type="text" placeholder="By Title" />
                </label>
                <label htmlFor="by price">
                Price: <input name="price" onChange={this.handleInput} value={price} id="by price" type="number" placeholder="By Price" />
                </label>

            </form>
        </section>
    }
}