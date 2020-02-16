import '../assets/styles/footer.styl'
export default {
    data(){
        return{
            author:'Solin'
        }
    },
    render(){
        return (
            <footer>
                <span>Written by {this.author}</span>
            </footer>
        )
    }
}