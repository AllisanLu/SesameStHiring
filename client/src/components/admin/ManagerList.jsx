import { useState } from "react"
import Manager from "./Manager";

function ManagerList({ user, managers, loadManagers }) {
  const [selectedManager, setSelectedManager] = useState();

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
            {managers?.map((manager) => {
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
      <Manager selectedManager={selectedManager} setSelectedManager={setSelectedManager}/>
    </>
  )
}

export default ManagerList
