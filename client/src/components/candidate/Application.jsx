import { useState, useEffect } from "react";
import { updateJob, updateApplication, deleteApplication, getCandidate, getJob, getApplicationsByJob } from "../../database";
import { toast } from "react-toastify";

function Application({ user, selectedApp, setSelectedApp, loadApplications, loadJobs }) {
  const [app, setApp] = useState(selectedApp);
  const [candidate, setCandidate] = useState();
  const [job, setJob] = useState();


  useEffect(() => {
    if (selectedApp) {
      setApp(selectedApp);
      getCandidate(selectedApp.userId).then(res => setCandidate(res));
      getJob(selectedApp.jobId).then(res => setJob(res));
    }
    else {
      setApp();
    }
  }, [selectedApp]);

  const handleClose = () => {
    setApp();
    setSelectedApp();
  }

  const handleHire = async () => {
    const acceptedApp = {
      ...app,
      applicationStatus: "Accepted"
    }
    await updateApplication(app.id, acceptedApp)

    const jobApplications = await getApplicationsByJob(job.id);
    console.log(jobApplications)

    for (let jobApp of jobApplications) {
      if (jobApp.id !== app.id) {
        await deleteApplication(jobApp.id);
      }
    }

    const completedJob = {
      ...job,
      listingStatus: "Closed"
    }

    await updateJob(job.id, completedJob);
    await loadApplications();
    await loadJobs();
    await setApp();
    await setSelectedApp();

    toast.success("Successfully hired !");
  }

  const handleReject = () => {
    const rejectedApp = {
      ...app,
      applicationStatus: "Rejected"
    }

    updateApplication(app.id, rejectedApp).then(res => {
      loadApplications();
      setApp();
      setSelectedApp();
    })

    toast.success("Successfully rejected !");
  }

  const handleDelete = async () => {
    //api call to delete id
    deleteApplication(app.id).then(res => {
      loadApplications();
      setApp();
      setSelectedApp();
    })
  }

  return (
    <>
      {app ?
        (
          <div className="modal-bg">
            <div className="modal-content">
              <div className="background-green">
                <h3>Application for {job?.jobTitle}</h3>
                <div className="left-text">
                  <h4>Candidate: {candidate?.fullName} </h4>
                  <h4>Resume</h4>
                  <p>{app.resume}</p>
                  <h4>Cover Letter</h4>
                  <p>{app.coverLetter}</p>
                  <h4>Status</h4>
                  <p>{app.applicationStatus}</p>
                  <h4>Date Applied</h4>
                  <p>{app.dateApplied}</p>

                  <div className="button-group">
                    {user?.id === app.userId ? <button className="btn btn-danger" onClick={handleDelete}>Withdraw</button> : null}
                    {user.type !== "candidate" &&
                      app.applicationStatus === "Pending" ? <>
                      <button className="btn btn-warning" onClick={handleHire}>Hire</button>
                      <button className="btn btn-danger" onClick={handleReject}>Reject</button>
                    </> : null
                    }
                    <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : null
      }
    </>
  )
}

export default Application
