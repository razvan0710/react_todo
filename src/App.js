import logo from './logo.svg';
import './App.css';
import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'

function App() {
  return (
    <div className="App">
      {/* <PropsExample/> */}
      <TodoApp/>
      {/* <Counter/> */}
    </div>
  );
}

export default App;
