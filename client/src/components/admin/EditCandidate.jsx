import { useState, useEffect } from "react"
import { updateCandidate } from "../../database";


const EditCandidate = ({ loadCandidates, selectedCandidate, setSelectedCandidate }) => {
    const [candidate, setCandidate] = useState(selectedCandidate);

    useEffect(() => {
        if (selectedCandidate) setCandidate(selectedCandidate);
        else setCandidate();
    }, [selectedCandidate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCandidate(candidate.id, candidate)
        await loadCandidates();
        setSelectedCandidate();
    }

    const resetState = () => {
        setSelectedCandidate();
        setCandidate();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        resetState();
    };

    const handleOnChange = (e) => {
        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {candidate ? (
                <div className="modal-bg left-text">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} onReset={handleCancel} >
                            <h3>Edit Candidate</h3>
                            <div className="mb-3 form-group">
                                <label htmlFor="fullName">Name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="fullName"
                                    value={candidate?.fullName}
                                    placeholder="Enter Name"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={candidate?.email}
                                    placeholder="Enter email"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={candidate?.address}
                                    placeholder="Enter address"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    value={candidate?.phone}
                                    placeholder="123-456-7890"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="resume">Resume</label>
                                <textarea
                                    id="resume"
                                    type="text"
                                    name="resume"
                                    value={candidate?.resume}
                                    placeholder="Enter resume details"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button className="btn btn-success" type="submit">
                                    Update
                                </button>
                                <button className="btn btn-secondary" type="reset">
                                    Cancel
                                </button>
                            </div>
                        </form >
                    </div>
                </div>) : null}

        </>
    )
}

export default EditCandidate