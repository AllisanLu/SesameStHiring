import { useState, useEffect } from "react";

import Job from "./Job";

function JobList({ user, jobs }) {

  const [viewableJobs, setViewableJobs] = useState(jobs)
  const [selectedJob, setSelectedJob] = useState()

  // add a fetch to get the manager's list of jobs
  useEffect(() => {
    if (user?.type === "manager") {
      console.log("Filtering jobs for manager");
    }
  }, [viewableJobs])

  const handleSelect = (job) => {
    if (selectedJob?.id === job.id) {
      setSelectedJob();
    } else {
      setSelectedJob(job);
    }
  }

  const handleDelete = (job) => {
    const id = job.id;

    //api call to delete id
  }

  const handleApply = (e) => {
    // need to open up application page
    // or just auto applies with candidate information that is already filled out
  }

  return (
    <>
      <h3>Avaliable Jobs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Job Description</th>
            <th>Hiring Manager</th>
            <th>--</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job) => {
            return (
            <tr key={job.id} onClick={() => handleSelect(job)}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.manager}</td>
              <td>{user?.type === "manager" ? 
                <button onClick={(job) => handleDelete(job)}>Delete</button> 
                : <button onClick={(e) => handleApply(e)}>Apply</button>}</td>
            </tr>
          )}
          )}
        </tbody>
      </table>
      <Job user={user} selectedJob={selectedJob} setSelectedJob={setSelectedJob} handleDelete={handleDelete} />
    </>
  )
}

export default JobList
