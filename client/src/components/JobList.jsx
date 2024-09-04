import { useState, useEffect } from "react";
import { deleteJob, getManagerJobs } from "../database";

import Job from "./Job";
import EditJob from "./manager/EditJob"
import CreateApplication from "./candidate/CreateApplication";

function JobList({ user, jobs, loadJobs, loadApplications }) {
  const [creating, setCreating] = useState(false);
  const [viewableJobs, setViewableJobs] = useState(jobs)
  const [selectedJob, setSelectedJob] = useState();

  const [applying, setApplying] = useState(false);

  // add a fetch to get the manager's list of jobs
  useEffect(() => {
    if (user?.type === "manager") {
      getManagerJobs(user.id).then(res => setViewableJobs(res))
    }
    if (jobs) { 
      if (user?.type === "candidate") {
        const pendingJobs = jobs.filter((job) => job.listingStatus === "Pending")
        setViewableJobs(pendingJobs)
      } else {
        setViewableJobs(jobs);
      }
    }
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
   setApplying(true);
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
                <th>Job Id</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Hiring Manager</th>
                <th>Date Created</th>
                <th>Date Closed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="table-horizontal">
              {viewableJobs?.map((job) => {
                return (
                  <tr key={job.id} onClick={() => handleSelect(job)}>
                    <td>{job.id}</td>
                    <td>{job.jobTitle}</td>
                    <td>{job.department}</td>
                    <td>{job.managerId}</td>
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
        : <Job selectedJob={selectedJob} setSelectedJob={setSelectedJob} handleApply={handleApply} />}
      {user.type === "candidate" ? <CreateApplication user={user} job={selectedJob} applying={applying} setApplying={setApplying} loadApplications={loadApplications} />
        : null}
    </>
  )
}

export default JobList
