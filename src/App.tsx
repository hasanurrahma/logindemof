import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
interface User {
  username: string;
  password: string;
}
const App: React.FC = () => {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  console.log(users);
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: regUsername,
        password: regPassword,
      });
      setRegUsername("");
      setRegPassword("");
      fetchUsers();
      const data = response.data;
      console.log(data);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Register page</h1>
      <input
        type="text"
        placeholder="user name"
        value={regUsername}
        onChange={(e) => setRegUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={regPassword}
        onChange={(e) => setRegPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
      <h2 style={{ textAlign: "center" }}>Registered Users</h2>
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
