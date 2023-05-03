// import logo from './logo.svg';
// import './App.css';
import "./app.css";
import { useState,useEffect } from "react";





function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [editTodo,setEdit]=useState(null)

  const handleEdit=(obj)=>{
    const findTodo=toDos.find((toDo)=>obj.id===toDo.id)
    console.log(findTodo);
    setEdit(findTodo)
  }
  const  updateTodo=(value,id,status)=> {
    const newTodo=toDos.map((todo)=>
        todo.id===id ? {value,id,status} : todo
    )
    setTodos( newTodo)
    setEdit(null)}

    useEffect(()=>{
      if(editTodo){
        setToDo(editTodo.value)
      }
      else{
        setToDo(" ")
      }
    },[setToDo,editTodo])
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
       
        <i
          onClick={() =>
            {if(!editTodo){
             if(/^\s*$/.test(toDo)){
              return
             }else{
              setTodos([...toDos, { id: Date.now(), value: toDo, status: false }])
             }

              
              setToDo(" ")
            }else{
              updateTodo(toDo,editTodo.id,editTodo.status)
            }
          }
           
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    console.log(e.target.checked, 11111);
                    setTodos(
                      toDos.filter((obj2) => {
                        if (obj.id === obj2.id) {
                          obj2.status = e.target.checked;
                        }
                        return obj2;
                      })
                    );
                    console.log(toDos);
                  }}
                />
                <p>{obj.value}</p>
              </div>
              <div className="right">
              <i
              onClick={()=>{
                handleEdit(obj)
              }}
              class="fas fa-edit"></i>


                <i
                  onClick={() => {
                    const removArr = [
                      ...toDos.filter((toDo) => toDo.id !== obj.id),
                    ];
                    setTodos(removArr);
                  }}
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
