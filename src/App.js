/* 

Endpoint to retrieve data -
https://randomuser.me/api/?results=20&nat=us,dk,fr,gb

*** You do not need to worry about styling. 
*/

import { useCallback, useEffect, useState } from "react";
import Users from "./Users";
import axios from "axios";
import "./styles.css";

function App() {
  const [users, setUsers] = useState();

  const fetchData = useCallback(() => {
    axios
      .get("https://randomuser.me/api/?results=20&nat=us,dk,fr,gb")
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>MTM User Profiles</h1>
      <Users users={users} />
    </div>
  );
}

export default App;
