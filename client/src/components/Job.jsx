import { useState, useEffect } from "react";

function Job({ user, selectedJob, setSelectedJob, handleDelete }) {

  const [job, setJob] = useState(selectedJob);

  useEffect(() => {
    if (selectedJob) setJob(selectedJob);
    else setJob();
  }, [selectedJob]);

  const handleSubmit = (e) => {
    console.log("Update job");

    //api call to update the job then deselect it
  }

  const handleOnChange = (e) => {
    setSelectedJob({
      ...selectedJob,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      {job ?
        (
          <form onSubmit={handleSubmit}>
            <h3>{job.title}</h3>
            {user.id === job.manager ?
              (
              <div>
                <button type="submit">Update</button>
                <button onClick={() => handleDelete(job)}>Delete</button>
              </div>
              ) : null
            }
          </form>
        )
        : null}
    </>
  )
}

export default Job
