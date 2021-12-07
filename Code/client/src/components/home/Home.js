export default function Home() {
    
    var user = localStorage.getItem('user')
    return (
        <h1>
            Hello {user}
        </h1>
    )
}