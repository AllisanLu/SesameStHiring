import { useState, useEffect } from "react";
import { createJob, updateJob } from "../../database";

function EditJob({ user, selectedJob, setSelectedJob, loadJobs, handleDelete }) {

    const [job, setJob] = useState(selectedJob);

    useEffect(() => {
        if (selectedJob) { 
            if (!selectedJob.id && user.type === "manager") {
                setJob({
                    ...selectedJob,
                    department: user.department,
                    managerId: user.id
                })
            } else {
                setJob(selectedJob)
            }
        }
        else {
            setJob()
        }
    }, [selectedJob]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (job.id) {
            await updateJob(job.id, job);
        } else {
            const fulljob = {
                ...job,
                dateListed: new Date(),
                listingStatus: "Pending"
            }

           await createJob(fulljob);
        }

        setSelectedJob();
        setJob();
        loadJobs();
    }

    const handleOnChange = (e) => {
        setSelectedJob({
            ...job,
            [e.target.name]: e.target.value
        })
    }

    const handleCancel =(e) => {
        setSelectedJob();
        setJob();
    }

    return (
        <>
            {job ?
                (
                    <div className="modal-bg">
                        <div className="modal-content">
                            <form className="left-text" onSubmit={handleSubmit} onReset={handleCancel}>
                                <h3>{job.id ? "Update" : "Create"} Job Listing</h3>
                                <div className="mb-3 form-group">
                                    <label htmlFor="jobTitle">Job Title</label>
                                    <input
                                        id="jobTitle"
                                        name="jobTitle"
                                        placeholder="Enter job title"
                                        value={job?.jobTitle}
                                        className="form-control"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="department">Department</label>
                                    <input
                                        id="department"
                                        name="department"
                                        placeholder="Enter department"
                                        value={job?.department}
                                        className="form-control"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="jobDescription">Description</label>
                                    <input
                                        id="jobDescription"
                                        name="jobDescription"
                                        placeholder="Enter description"
                                        value={job?.jobDescription}
                                        className="form-control"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="managerId">Manager Id</label>
                                    <input
                                        id="managerId"
                                        name="managerId"
                                        placeholder="Enter manager id"
                                        value={job?.managerId}
                                        className="form-control"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="additionalInformation">Additional Info</label>
                                    <textarea
                                        id="additionalInformation"
                                        name="additionalInformation"
                                        placeholder="Enter any additional information"
                                        value={job.additionalInformation}
                                        className="form-control"
                                        onChange={handleOnChange}
                                    />
                                </div>

                                {job.dateListed ? <>
                                    <h5>Date created</h5>
                                    <p>{job.dateListed}</p>
                                </> : null }
                                {job.dateClosed ? <>
                                    <h5>Date closed</h5>
                                    <p>{job.dateClosed}</p>
                                </> : null }
                                {job.listingStatus ? <> 
                                    <h5>Status</h5>
                                    <p>{job.listingStatus}</p>
                                </> : null}

                                <div className="button-group">
                                    <button className="btn btn-success" type="submit">Submit</button>
                                    {job.id ? <button className="btn btn-danger" onClick={() => handleDelete(job)}>Delete</button> : null }
                                    <button className="btn btn-secondary" type="reset">Cancel</button>
                                </div>

                            </form>
                        </div>
                    </div>
                )
                : null}
        </>
    )
}

export default EditJob
