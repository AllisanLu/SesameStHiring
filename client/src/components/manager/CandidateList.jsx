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
      <table className="table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Candidate Id</th>
          </tr>
        </thead>
        <tbody>
          {candidates?.map((candidate) => {
            return (
              <tr key={candidate.id} onClick={() => handleView(candidate)}>
                <td>{candidate.name}</td>
                <td>{candidate.id}</td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
      <Candidate selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />
    </>
  )
}

export default CandidateList
