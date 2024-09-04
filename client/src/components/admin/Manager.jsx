import { useState, useEffect } from "react";
import { updateManager } from "../../database";

function Manager({ selectedManager, setSelectedManager, loadManagers }) {

    const [manager, setManager] = useState(selectedManager);

    useEffect(() => {
        if (selectedManager) setManager(selectedManager);
        else setManager();
    }, [selectedManager]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateManager(manager.id, manager).then(res => {
            setManager();
            setSelectedManager();
            loadManagers();
        })
    }

    const resetState = () => {
        setSelectedManager();
        setManager();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        resetState();
    };

    const handleOnChange = (e) => {
        setManager({
            ...manager,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {manager ?
                <div className="modal-bg left-text">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} onReset={handleCancel}>
                            <h3>Edit Manager</h3>
                            <div className="mb-3 form-group">
                                <label htmlFor="fullName">Name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter name"
                                    value={manager?.fullName}
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={manager?.email}
                                    placeholder="abc@example.com"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    value={manager?.phone}
                                    placeholder="123-456-7890"
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
                                    type="department"
                                    value={manager?.department}
                                    placeholder="Enter department"
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
                        </form>
                    </div>
                </div>
                : null}
        </>
    )
}

export default Manager
