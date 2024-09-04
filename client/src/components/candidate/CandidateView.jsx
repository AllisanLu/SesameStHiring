import { useState, useEffect } from "react";
import { createCandidate, updateUser, updateCandidate, getCandidate } from "../../database";

function CandidateView({ user, setUser }) {
    const [candidate, setCandidate] = useState(user);

    useEffect(()=> {
        if (user) {
          setCandidate(user);
        }
      }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const check = await getCandidate(user.id);

        let res = null;
        if (!check) {
            await updateUser(user.id, {...user, type: "candidate"});
            res = await createCandidate(user.id, candidate);
        } else {
            res = await updateCandidate(user.id, candidate);
        }
        setUser(res);
    }

    const handleOnChange = (e) => {
        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="small-form left-text" onSubmit={handleSubmit} >
            <h3>{user?.fullName ? "Update" : "Create"} your candidate profile</h3>
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
                <button className="btn btn-secondary" type="submit">
                    {candidate?.fullName ? "Update" : "Create"}   
                </button>
            </div>
        </form>
    )
}

export default CandidateView