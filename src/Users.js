import { useEffect, useState } from "react";

const grouping = (key, usrs = []) => {
  let retVal = {};
  usrs.forEach((item) => {
    const nestedProps = key.split(".");
    const val = nestedProps.reduce((obj, prop) => obj?.[prop], item);
    const groupKey = val !== undefined ? val : "Other";
    const group = retVal[groupKey] || [];
    group.push(item);
    retVal[groupKey] = group;
  });
  return retVal;
};
export default function Users({ users }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  let filteredUsers =
    users &&
    users.filter((user) =>
      user.name.first.toLowerCase().includes(searchValue.toLowerCase())
    );

  const sortedUsers =
    filteredUsers &&
    filteredUsers.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.first.localeCompare(b.name.first);
      } else {
        return b.name.first.localeCompare(a.name.first);
      }
    });

  useEffect(() => {
    filteredUsers;
  }, [users]);

  const groupedUsers = grouping("location.country", sortedUsers);

  return (
    <div>
      <div className="row mb-5">
        <div className="col-6">
          <label htmlFor="search-input">Search by first name:</label>
          <input
            id="search-input"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        <div className="col-6">
          {" "}
          <label htmlFor="sort-select">Sort by first name:</label>
          <select
            id="sort-select"
            className="form-select"
            alue={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div>{console.log(groupedUsers)}</div>
      {Object.entries(groupedUsers).map(([gender, users]) => (
        <div key={gender} className="mb-5">
          <h2 className="text-capitalize">{gender}</h2>
          <table className="table table-bordered table-striped">
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {user.name.first} {user.name.last}
                    </td>
                    <td>{user.gender}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
