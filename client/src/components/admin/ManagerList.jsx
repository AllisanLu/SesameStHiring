import { useState, useEffect } from "react"
import Manager from "./Manager";

function ManagerList({ managers, loadManagers }) {
  const [managerList, setManagerList] = useState(managers)
  const [selectedManager, setSelectedManager] = useState();

  useEffect(() => {
    if (managers) setManagerList(managers)
  }, [managers])

  const handleView = (manager) => {
    if (manager.id === selectedManager?.id) {
      setSelectedManager();
    } else {
      setSelectedManager(manager);
    }
  }

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredList = managerList?.filter((manager) => {
        return manager.fullName.toLowerCase().includes(e.target.value.toLowerCase()) 
          || manager.department.toLowerCase().includes(e.target.value.toLowerCase());
      }) ;
      setManagerList(filteredList);
    } else {
      setManagerList(managers);
    }
  }

  return (
    <>
      <h3>Managers</h3>
      <div>
        <label htmlFor="search" className="font-23">Search: </label>
        <input className="search-bar font-23" id="search" name="search" placeholder="Search Name or Department" onChange={(e) => handleSearch(e)} />
      </div>
      <div className="table-wrapper">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody className="table-horizontal">
            {managerList?.map((manager) => {
              return (
                <tr key={manager.id} onClick={() => handleView(manager)}>
                  <td>{manager?.fullName}</td>
                  <td>{manager?.email}</td>
                  <td>{manager?.phone}</td>
                  <td>{manager?.department}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      <Manager selectedManager={selectedManager} setSelectedManager={setSelectedManager} loadManagers={loadManagers} />
    </>
  )
}

export default ManagerList
