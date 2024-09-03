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

  return (
    <>
      <h3>Managers</h3>
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
      <Manager selectedManager={selectedManager} setSelectedManager={setSelectedManager} loadManagers={loadManagers}/>
    </>
  )
}

export default ManagerList
