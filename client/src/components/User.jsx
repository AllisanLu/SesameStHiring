import JobList from "./JobList"
import CandidateList from "./CandidateList"

function User({ user }) {
    return (
      <>
        <h1>Welcome {user?.username}!</h1>
        {user?.type === "manager"? <JobList></JobList> : <CandidateList></CandidateList>}
      </>
    )
  }
  
  export default User
  