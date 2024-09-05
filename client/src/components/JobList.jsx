import { useState, useEffect } from "react";
import { deleteJob, getManagerJobs } from "../database";

import Job from "./Job";
import EditJob from "./manager/EditJob"
import CreateApplication from "./candidate/CreateApplication";

function JobList({ user, jobs, loadJobs, loadApplications, token }) {
  const [creating, setCreating] = useState(false);
  const [viewableJobs, setViewableJobs] = useState(jobs)
  const [selectedJob, setSelectedJob] = useState();

  const [applying, setApplying] = useState(false);

  // add a fetch to get the manager's list of jobs
  useEffect(() => {
    filterJobs(jobs).then (res => {
      setViewableJobs(res)
    })
  }, [jobs])

  const filterJobs = async (jobs) => {
    if (user?.type === "ROLE_MANAGER") {
      return await getManagerJobs(user.id, token);
    }
    if (jobs) {
      if (user?.type === "ROLE_CANDIDATE") {
        const pendingJobs = jobs.filter((job) => job.listingStatus === "Pending")
        return pendingJobs
      } else {
        return jobs
      }
    }
  }

  const handleSelect = (job) => {
    if (selectedJob?.id === job.id) {
      setSelectedJob();
    } else {
      setSelectedJob(job);
    }
  }

  const handleDelete = async (job) => {
    const id = job.id;
    await deleteJob(id, token);
    await setSelectedJob();
    await loadJobs();
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

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredList = viewableJobs?.filter((job) => {
        return job.jobTitle.toLowerCase().includes(e.target.value.toLowerCase())
      });
      setViewableJobs(filteredList);
    } else {
      filterJobs(jobs).then(res => setViewableJobs(res))
    }
  }

  return (
    <>
      <h3>Listed Jobs</h3>
      <div>
        <div>
          <label htmlFor="search" className="font-23">Search: </label>
          <input className="search-bar font-23" id="search" name="search" placeholder="Search Title or Department" onChange={(e) => handleSearch(e)} />
          {user.type != "ROLE_CANDIDATE" ? <button className="btn btn-success" onClick={showCreateNewJob}>Create Job Listing</button> : null}
        </div>
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
      {user.type != "ROLE_CANDIDATE" ? <EditJob user={user} selectedJob={selectedJob} setSelectedJob={setSelectedJob} handleDelete={handleDelete} loadJobs={loadJobs} />
        : <Job selectedJob={selectedJob} setSelectedJob={setSelectedJob} handleApply={handleApply} />}
      {user.type === "ROLE_CANDIDATE" ? <CreateApplication user={user} job={selectedJob} applying={applying} setApplying={setApplying} loadApplications={loadApplications} />
        : null}
    </>
  )
}

export default JobList
