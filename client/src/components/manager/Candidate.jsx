import { useState, useEffect } from "react";

function Candidate({ loadCandidates, selectedCandidate, setSelectedCandidate }) {

  const [candidate, setCandidate] = useState(selectedCandidate);

  useEffect(() => {
    if (selectedCandidate) setCandidate(selectedCandidate);
    else setCandidate();
  }, [selectedCandidate]);

  return (
    <>
      {candidate ? 
        (
            <div>
              <h3>View Candidate {candidate.fullName} </h3>
              <div className="mb-3 form-group">
                <h4>Name</h4>
                <p>{candidate.fullName}</p>
              </div>
              <div className="mb-3 form-group">
                <h4>Email</h4>
                <p>{candidate.email}</p>
              </div>
              <div className="mb-3 form-group">
                <h4>Address</h4>
                <p>{candidate.address}</p>
              </div>
              <div className="mb-3 form-group">
                <h4>Phone</h4>
                <p>{candidate.phone}</p>
              </div>
              <div className="mb-3 form-group">
                <h4>Resume</h4>
                <p>{candidate.resume}</p>
              </div>
            </div>
          )
        
       : null}
    </>
  )
}

export default Candidate
