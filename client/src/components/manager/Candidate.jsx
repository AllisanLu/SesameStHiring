import { useState, useEffect } from "react";

function Candidate({ loadCandidates, selectedCandidate, setSelectedCandidate }) {

  const [candidate, setCandidate] = useState(selectedCandidate);

  useEffect(() => {
    if (selectedCandidate) setCandidate(selectedCandidate);
    else setCandidate();
  }, [selectedCandidate]);

  const clearCandidate = () => {
    setCandidate();
  }

  return (
    <>
      {candidate ?
        (
          <div className="left-text modal-bg">
            <div className="modal-content">
              <div className="background-green">
                <h3>View Candidate {candidate.fullName} </h3>
                <div className="mb-3 form-group">
                  <h5>Name</h5>
                  <p>{candidate.fullName}</p>
                </div>
                <div className="mb-3 form-group">
                  <h5>Email</h5>
                  <p>{candidate.email}</p>
                </div>
                <div className="mb-3 form-group">
                  <h5>Address</h5>
                  <p>{candidate.address}</p>
                </div>
                <div className="mb-3 form-group">
                  <h5>Phone</h5>
                  <p>{candidate.phone}</p>
                </div>
                <div className="mb-3 form-group">
                  <h5>Resume</h5>
                  <p>{candidate.resume}</p>
                </div>
                <div className="button-group">
                  <button className="btn btn-secondary" onClick={clearCandidate}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

        : null}
    </>
  )
}

export default Candidate
