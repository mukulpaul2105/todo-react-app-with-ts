import './App.css'
import AddToDo from './component/addtodo'
import Navbar from './component/navbar'
import Todos from './component/todos'

function App() {
  return <div className='main'>
    <h2>TODO REACT + TYPESCRIPT</h2>
    <Navbar />
    <AddToDo />
    <Todos />
  </div>
}

export default App
