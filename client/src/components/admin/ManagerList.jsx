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
              <th>Address</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody className="table-horizontal">
            {managers?.map((manager) => {
              return (
                <tr key={manager.id} onClick={() => handleView(manager)}>
                  <td>{manager?.fullName}</td>
                  <td>{manager?.email}</td>
                  <td>{manager?.phone}</td>
                  <td>{manager?.address}</td>
                  <td>{manager?.resume}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      {user.type === "admin" ?
        <EditCandidate loadCandidates={loadCandidates} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />
        : <Candidate  loadCandidates={loadCandidates} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />
      }
    </>
  )
}

export default CandidateList
