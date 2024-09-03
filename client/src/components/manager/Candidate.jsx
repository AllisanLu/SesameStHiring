import { useState, useEffect } from "react";

function Candidate({ selectedCandidate, setSelectedCandidate }) {

  const [candidate, setCandidate] = useState(selectedCandidate);

  useEffect(() => {
    if (selectedCandidate) setCandidate(selectedCandidate);
    else setCandidate();
  }, [selectedCandidate]);

  const handleSubmit = (candidate) => {
    console.log(`Hiring candidate ${candidate.name}`)
  }

  return (
    <>
      {candidate ? <h3>{candidate.name}</h3> : null}
    </>
  )
}

export default Candidate
