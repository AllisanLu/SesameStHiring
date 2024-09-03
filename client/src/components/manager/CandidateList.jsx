import { useState } from "react"
import Candidate from "./Candidate";

function CandidateList({ candidates }) {
  const [selectedCandidate, setSelectedCandidate] = useState();

  const handleView = (candidate) => {
    if (candidate.id === selectedCandidate?.id) {
      setSelectedCandidate();
    } else {
      setSelectedCandidate(candidate);
    }
  }

  return (
    <>
      {/* Could sort candidates by the job they applied for */}
      <h3>Candidates</h3>
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
            {candidates?.map((candidate) => {
              return (
                <tr key={candidate.id} onClick={() => handleView(candidate)}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.address}</td>
                  <td>{candidate.resume}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      <Candidate selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />
    </>
  )
}

export default CandidateList
