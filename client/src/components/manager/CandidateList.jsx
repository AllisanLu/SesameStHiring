import { useState, useEffect } from "react"
import Candidate from "./Candidate";
import EditCandidate from "../admin/editCandidate";

function CandidateList({ user, candidates, loadCandidates }) {
  const [selectedCandidate, setSelectedCandidate] = useState();
  const [candidateList, setCandidateList] = useState(candidates);

  useEffect(() => {
    if (candidates) setCandidateList(candidates)
  }, [candidates])

  const handleView = (candidate) => {
    if (candidate.id === selectedCandidate?.id) {
      setSelectedCandidate();
    } else {
      setSelectedCandidate(candidate);
    }
  }

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredList = candidateList?.filter((candidate) => {
        return candidate.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      }) ;
      setCandidateList(filteredList);
    } else {
      setCandidateList(candidates);
    }
  }


  return (
    <>
      <h3>Candidates</h3>
      <div>
        <label htmlFor="search" className="font-23">Search: </label>
        <input className="search-bar font-23" id="search" name="search" placeholder="Search Name" onChange={(e) => handleSearch(e)} />
      </div>
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
            {candidateList?.map((candidate) => {
              return (
                <tr key={candidate.id} onClick={() => handleView(candidate)}>
                  <td>{candidate?.fullName}</td>
                  <td>{candidate?.email}</td>
                  <td>{candidate?.phone}</td>
                  <td>{candidate?.address}</td>
                  <td>{candidate?.resume}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      {user.type === "ROLE_ADMIN" ?
        <EditCandidate loadCandidates={loadCandidates} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />
        : <Candidate  loadCandidates={loadCandidates} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />
      }
    </>
  )
}

export default CandidateList
