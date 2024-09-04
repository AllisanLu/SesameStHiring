import { useState, useEffect } from "react";
import { deleteJob, getManagerJobs } from "../database";

import Job from "./Job";
import EditJob from "./manager/EditJob"

function JobList({ user, jobs, loadJobs }) {
  const [creating, setCreating] = useState(false);
  const [viewableJobs, setViewableJobs] = useState(jobs)
  const [selectedJob, setSelectedJob] = useState()

  // add a fetch to get the manager's list of jobs
  useEffect(() => {
    if (user?.type === "manager") {
      console.log("Filtering jobs for manager");
      getManagerJobs(user.id).then(res => setViewableJobs(res))
    }
    if (jobs) setViewableJobs(jobs)
  }, [jobs])

  const handleSelect = (job) => {
    if (selectedJob?.id === job.id) {
      setSelectedJob();
    } else {
      setSelectedJob(job);
    }
  }

  const handleDelete = (job) => {
    const id = job.id;
    deleteJob(id);
    setSelectedJob();
    loadJobs();
  }

  const handleApply = (e) => {
    // need to open up application page
    // or just auto applies with candidate information that is already filled out
  }

  const showCreateNewJob = (e) => {
    if (creating) {
      setCreating(false);
      setSelectedJob();
    } else {
      setCreating(true);
      setSelectedJob({});
    }
  }

  return (
    <>
      <h3>Listed Jobs</h3>
      <div>
      {user.type != "candidate" ? <button className="btn btn-success" onClick={showCreateNewJob}>Create Job Listing</button> : null}
        <div className="table-wrapper">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Description</th>
                <th>Hiring Manager</th>
                <th>Additional Info</th>
                <th>Date Created</th>
                <th>Date Closed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="table-horizontal">
              {viewableJobs?.map((job) => {
                return (
                  <tr key={job.id} onClick={() => handleSelect(job)}>
                    <td>{job.jobTitle}</td>
                    <td>{job.department}</td>
                    <td>{job.jobDescription}</td>
                    <td>{job.managerId}</td>
                    <td>{job.additionalInformation}</td>
                    <td>{job.dateListed}</td>
                    <td>{job.dateClosed}</td>
                    <td>{job.listingStatus}</td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
      {user.type != "candidate" ? <EditJob user={user} selectedJob={selectedJob} setSelectedJob={setSelectedJob} handleDelete={handleDelete} loadJobs={loadJobs} /> 
        : <Job selectedJob={selectedJob} setSelectedJob={setSelectedJob} handleApply={handleApply}/>}
    </>
  )
}

export default JobList
