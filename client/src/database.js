// for doing API calls :D
import { toast } from "react-toastify";

// LOGIN

let authToken = "";

async function login(userInfo, setToken) {
    const user = await fetch("http://localhost:8080/api/login", {
        headers: { "Authorization" : `Basic ${btoa(`${userInfo.username}:${userInfo.password}`)}` },
        method: "POST",
    })
    .then(response => {
    if (response.ok) {
            const token = response.headers.get("Authorization");
            authToken = token;
            return response.json();
        } else {
            toast.error("Failed to Login !")
        }
    })

    return user
}

function logout(){
    authToken = "";
}

async function register(userInfo, setToken) {
    const user = await fetch("http://localhost:8080/api/register", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        if (response.ok) {
            //get token from header
            const token = response.headers.get('Authorization');
            authToken = token;
            //setToken(token)
            return response.json();
        } else {
            toast.error("Failed to register !")
        }
    })

    return user
}

// USERS

async function getUsers(token) {
    const newUsers = await fetch("http://localhost:8080/api/users", {
        headers: { "Authorization": authToken },
        method: "GET"
    })
    .then(response => response.json())
    return newUsers;
}

async function getUser(id, token) {
    return fetch(`http://localhost:8080/api/users/${id}`, {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function updateUser(id, user, token) {
    fetch(`http://localhost:8080/api/users/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": authToken },
        method: "PUT",
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function createUser(user, token) {
    return fetch("http://localhost:8080/api/users", {
        headers: { "Content-Type": "application/json", "Authorization": authToken },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(response => response.json())

}

// CANDIDATES

async function getCandidates(token) {
    return fetch("http://localhost:8080/api/candidates", {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function getCandidate(id, token) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Authorization":  authToken }
    })
    .then(response => { 
        if (response.ok)
            return response.json()
        return null
     })
}

async function createCandidate(id, candidate, token) {
    return fetch("http://localhost:8080/api/candidates", {
        headers: { "Content-Type": "application/json", "Authorization": authToken },
        method: "POST",
        body: JSON.stringify({...candidate, id})
    }).then(res => res.json());
}

async function updateCandidate(id, candidate, token) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "PUT",
        body: JSON.stringify({...candidate, id})
    }).then(res => res.json());
}

async function deleteCandidate(id, token) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Authorization": authToken },
        method: "DELETE"
    }).then(res => res.json());
}

// MANAGERS

async function getManagers(token) {
    return fetch("http://localhost:8080/api/managers", {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function getManager(id, token) {
    return fetch(`http://localhost:8080/api/managers/${id}`, {
        header: { "Authorization": authToken }
    })
    .then(response => { 
        if (response.ok)
            return response.json()
        return null
     })
}

async function createManager(id, manager, token) {
    return fetch("http://localhost:8080/api/managers", {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "POST",
        body: JSON.stringify({...manager, id})
    }).then(res => res.json());
}

async function updateManager(id, manager, token) {
    return fetch(`http://localhost:8080/api/managers/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "PUT",
        body: JSON.stringify({...manager, id})
    }).then(res => res.json());
}

// JOBS

async function getJobs(token) {
    return fetch("http://localhost:8080/api/jobs", {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function getJob(id, token) {
    return fetch(`http://localhost:8080/api/jobs/${id}`, {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function createJob(job, token) {
    return fetch("http://localhost:8080/api/jobs", {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "POST",
        body: JSON.stringify(job)
    }).then(res => res.json());
}

async function getManagerJobs(managerid, token) {
    return fetch(`http://localhost:8080/api/jobs/manager/${managerid}`, {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function updateJob(id, job, token) {
    return fetch(`http://localhost:8080/api/jobs/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "PUT",
        body: JSON.stringify(job)
    }).then(res => res.json());
}

async function deleteJob(id, token) {
    return fetch(`http://localhost:8080/api/jobs/${id}`, {
        headers: { "Authorization": authToken },
        method: "DELETE"
    });
}

// APPLICATIONS

async function getApplications(token) {
    return fetch("http://localhost:8080/api/applications", {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function getApplicationsByJob(id, token) {
    return fetch(`http://localhost:8080/api/applications/job/${id}`, {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function getApplicationsByManager(id) {
    return fetch(`http://localhost:8080/api/applications/manager/${id}`, {
        headers: { "Authorization": authToken }
    })
    .then(response => response.json())
}

async function createApplication(app, token) {
    return fetch("http://localhost:8080/api/applications", {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "POST",
        body: JSON.stringify(app)
    }).then(res => res.json());
}

async function updateApplication(id, app, token) {
    return fetch(`http://localhost:8080/api/applications/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": authToken},
        method: "PUT",
        body: JSON.stringify(app)
    }).then(res => res.json());
}

async function deleteApplication(id, token) {
    return fetch(`http://localhost:8080/api/applications/${id}`, {
        headers: { "Authorization": authToken },
        method: "DELETE"
    });
}

export {
    login,
    logout,
    register,
    getUsers,
    getUser,
    createUser,
    updateUser,
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getManagers,
    getManager,
    createManager,
    updateManager,
    getJobs,
    getJob,
    getManagerJobs,
    createJob,
    updateJob,
    deleteJob,
    getApplications,
    getApplicationsByJob,
    getApplicationsByManager,
    createApplication,
    deleteApplication,
    updateApplication
}