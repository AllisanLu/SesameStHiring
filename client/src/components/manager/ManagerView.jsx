import { useState, useEffect } from "react";
import { createManager, updateManager, getManager } from "../../database";
import { toast } from "react-toastify";

function ManagerView({ user, setUser, token }) {
    const [manager, setManager] = useState(user)

    useEffect(()=> {
        if (user) {
          setManager(user);
        }
      }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // set new candidate and reload the page
        const check = await getManager(user.id, token);

        let res = null;
        if (!check) {
            res = await createManager(user.id, manager, token);
        } else {
            res = await updateManager(user.id, manager, token);
        }
        setUser(res);

        toast.success("Successfully updated !");
    }

    const handleOnChange = (e) => {
        setManager({
            ...manager,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="small-form left-text" onSubmit={handleSubmit} >
            <h3>{user?.fullName ? "Update" : "Create"} your manager profile</h3>
            <div className="mb-3 form-group">
                <label htmlFor="fullName">Name</label>
                <input
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    value={manager?.fullName}
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
                    value={manager?.email}
                    placeholder="Enter email"
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
                    type="text"
                    name="department"
                    value={manager?.department}
                    placeholder="Enter department"
                    className="form-control"
                    onChange={handleOnChange}
                    required
                />
            </div>
            <div className="">
                <button className="btn btn-warning" type="submit">
                    {user?.fullName ? "Update" : "Create"}
                </button>
            </div>
        </form>
    )
}

export default ManagerView