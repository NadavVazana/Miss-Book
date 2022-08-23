

export class LongText extends React.Component {
    state = {
        more: null,
        description: ''
    }
    componentDidMount() {
        this.getDesc()
    }
    getDesc() {
        const desc = this.props.bookDesc
        if (desc.length < 100) {
            this.setState({ more: null, description: desc })
        }
        else {
            this.setState({ more: desc.substring(101),description: `${desc.substring(0, 101)}...`})

        }
    }

    onReadMore = () => {
        this.setState({ more: null, description: this.props.bookDesc })
    }


    render() {
        const { more } = this.state
        return <section className="long-text">
            <p>{this.state.description}</p>
            {more && <button onClick={this.onReadMore}>Read more...</button>}
        </section>

    }
}