import { useState, useEffect } from "react";

function Job({ selectedJob, setSelectedJob, handleApply }) {

  const [job, setJob] = useState(selectedJob);

  useEffect(() => {
    if (selectedJob) setJob(selectedJob);
    else setJob();
  }, [selectedJob]);

  const apply = (job) => {
    // Need to create application :0


    setJob();
    setSelectedJob();
  }

  const handleCancel = (e) => {
    setSelectedJob();
    setJob();
  }

  return (
    <>
      {job ?
        (
          <div className="modal-bg">
            <div className="modal-content">
              <div className="background-green">
                <h3>View Job</h3>
                <div className="left-text">
                  <h4>Title: {job.jobTitle}</h4>
                  <h5>Department: {job.department}</h5>
                  <h5>Hiring Manager Id: {job.managerId}</h5>
                  <h5>Description</h5>
                  <p>{job.jobDescription}</p>
                  <h5>Additional Information</h5>
                  <p>{job.additionalInformation ? job.additionalInformation : "None"}</p>
                  {job.dateListed ? <>
                    <h5>Date created</h5>
                    <p>{job.dateListed}</p>
                  </> : null}
                  {job.dateClosed ? <>
                    <h5>Date closed</h5>
                    <p>{job.dateClosed}</p>
                  </> : null}
                  {job.listingStatus ? <>
                    <h5>Status</h5>
                    <p>{job.listingStatus}</p>
                  </> : null}

                  <div className="button-group">
                    <button className="btn btn-success" onClick={() => handleApply(job)}>Apply</button>
                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : null}
    </>
  )
}

export default Job
