import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  })

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    fetch('http://localhost:5000/users',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user),
      })
      .then(res => res.json())
      .then(data => {
        console.log('inside post response', data);
        const newUser = [...user, data]
        setUsers(newUser);
        form.reset();
      })
  }

  return (
    <>

      <h1>Users Management System</h1>
      <h3>Numbers Of Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" name="Add User" id="" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>
            {user.id} :-
            {user.name} :-
            {user.email} |
          </p>)
        }
      </div>
    </>
  )
}

export default App
