import { useState, useEffect } from "react";
import { createApplication } from "../../database";

function CreateApplication({ user, job, applying, setApplying, loadApplications }) {
    const [creating, setCreating] = useState(false);
    const [applyingUser, setApplyingUser] = useState(user);
    const [applyingJob, setApplyingJob] = useState(job);
    const [app, setApp] = useState({ resume: user?.resume });

    useEffect(() => {
        if (job) {
            setApplyingJob(job)

            if (applying) { 
                setCreating(applying)
            }

            if (user) {
                setApplyingUser(user)
            }
        }
    }, [applying, user, job])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Creating new application")
        const fullapp ={
            ...app,
            userId: applyingUser.id,
            jobId: applyingJob.id,
            dateApplied: new Date(),
            applicationStatus: "Pending"
        }
        await createApplication(fullapp);
        loadApplications();
        setCreating(false);
        setApplying(false);
    }

    const handleOnChange = (e) => {
        setApp({
            ...app,
            [e.target.name]: e.target.value
        })
    }

    const handleCancel = (e) => {
        setCreating(false);
        setApplying(false);
    }

    return (
        <>
            {creating ?
                (
                    <div className="modal-bg">
                        <div className="modal-content">
                            <div className="background-green">
                                <h3>Applying for {applyingJob?.jobTitle}</h3>
                                <form className="left-text" onSubmit={handleSubmit} onReset={handleCancel}>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="resume">Resume</label>
                                        <textarea
                                            id="resume"
                                            name="resume"
                                            placeholder="Enter resume details"
                                            value={app?.resume}
                                            className="form-control"
                                            onChange={handleOnChange}
                                            required
                                            rows="6"
                                        />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="coverLetter">Cover Letter</label>
                                        <textarea
                                            id="coverLetter"
                                            name="coverLetter"
                                            placeholder="Enter cover letter"
                                            value={app?.coverLetter}
                                            className="form-control"
                                            onChange={handleOnChange}
                                            rows="6"
                                        />
                                    </div>

                                    <div className="button-group">
                                        <button className="btn btn-success" type="submit">Submit</button>
                                        <button className="btn btn-secondary" type="reset">Cancel</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                )
                : null}
        </>
    )
}

export default CreateApplication
