import { useState, useEffect } from "react";
import { getManager } from "../database";

function Job({ selectedJob, setSelectedJob, handleApply }) {

  const [job, setJob] = useState(selectedJob);
  const [manager, setManager] = useState();

  useEffect(() => {
    if (selectedJob) {
      setJob(selectedJob);
      getManager(selectedJob.managerId).then(res => {
        setManager(res)
      })
    }
    else {
      setJob();
    }
  }, [selectedJob]);

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
                  {job.listingStatus ? <>
                    <h5>Status</h5>
                    <p>{job.listingStatus}</p>
                  </> : null}
                  <h5>Department: {job.department}</h5>
                  <h5>Hiring Manager: {manager?.fullName}</h5>
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

                  <div className="button-group">
                    <button className="btn btn-warning" onClick={handleApply}>Apply</button>
                    <button className="btn btn-secondary" onClick={handleCancel}>Close</button>
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
