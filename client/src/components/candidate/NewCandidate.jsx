import { useState } from "react";
import { createCandidate } from "../../database";

function NewCandidate(user, setUser) {
    const [newCandidate, setNewCandidate] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
       // set new candidate and reload the page
       const res = await createCandidate(user.id, newCandidate)
       setUser(res);
    }
  
    const handleOnChange = (e) => {
      setNewCandidate({
          ...newCandidate,
          [e.target.name]: e.target.value
      })
  }

    return (
        <form onSubmit={handleSubmit} >
        <h3>Create your candidate profile</h3>
        <div className="mb-3 form-group">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="name"
                value={newCandidate?.name}
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
                value={newCandidate?.email}
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
                value={newCandidate?.address}
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
                value={newCandidate?.phone}
                placeholder="Enter phone"
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
                value={newCandidate?.resume}
                placeholder="Enter resume details"
                className="form-control"
                onChange={handleOnChange}
                required
            />
        </div>
        <div className="button-group">
            <button className="btn btn-secondary" type="submit">
                Create
            </button>
        </div>
    </form>
    )
}

export default NewCandidate