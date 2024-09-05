// for doing API calls :D
let token = ""

// LOGIN

async function login(userInfo) {
    const user = await fetch("http://localhost:8080/api/login", {
        headers: { "Authorization" : btoa(`${userInfo.username}:${userInfo.password}`) },
        method: "POST",
    })
    .then(response => {
        if (response.ok) {
            //get token from header
            token = response.headers.get('Authorization');
            return response.json();
        } else {
            return response.error
        }
    })

    return user
}

async function register(userInfo) {
    const user = await fetch("http://localhost:8080/api/register", {
        headers: { "Content-Type": "application/json", "Authorization": token },
        method: "POST",
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        if (response.ok) {
            //get token from header
            token = response.headers.get('Authorization');
            return response.json();
        } else {
            return response.error
        }
    })

    return user
}

// USERS

async function getUsers() {
    const newUsers = await fetch("http://localhost:8080/api/users", {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
    return newUsers;
}

async function getUser(id) {
    return fetch(`http://localhost:8080/api/users/${id}`, {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function updateUser(id, user) {
    fetch(`http://localhost:8080/api/users/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": token },
        method: "PUT",
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function createUser(user) {
    return fetch("http://localhost:8080/api/users", {
        headers: { "Content-Type": "application/json", "Authorization": token },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(response => response.json())

}

// CANDIDATES

async function getCandidates() {
    return fetch("http://localhost:8080/api/candidates", {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function getCandidate(id) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Authorization": token }
    })
    .then(response => { 
        if (response.ok)
            return response.json()
        return null
     })
}

async function createCandidate(id, candidate) {
    return fetch("http://localhost:8080/api/candidates", {
        headers: { "Content-Type": "application/json", "Authorization": token },
        method: "POST",
        body: JSON.stringify({...candidate, id})
    }).then(res => res.json());
}

async function updateCandidate(id, candidate) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "PUT",
        body: JSON.stringify({...candidate, id})
    }).then(res => res.json());
}

async function deleteCandidate(id) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Authorization": token },
        method: "DELETE"
    }).then(res => res.json());
}

// MANAGERS

async function getManagers() {
    return fetch("http://localhost:8080/api/managers", {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function getManager(id) {
    return fetch(`http://localhost:8080/api/managers/${id}`, {
        header: { "Authorization": token }
    })
    .then(response => { 
        if (response.ok)
            return response.json()
        return null
     })
}

async function createManager(id, manager) {
    return fetch("http://localhost:8080/api/managers", {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "POST",
        body: JSON.stringify({...manager, id})
    }).then(res => res.json());
}

async function updateManager(id, manager) {
    return fetch(`http://localhost:8080/api/managers/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "PUT",
        body: JSON.stringify({...manager, id})
    }).then(res => res.json());
}

// JOBS

async function getJobs() {
    return fetch("http://localhost:8080/api/jobs", {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function getJob(id) {
    return fetch(`http://localhost:8080/api/jobs/${id}`, {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function createJob(job) {
    return fetch("http://localhost:8080/api/jobs", {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "POST",
        body: JSON.stringify(job)
    }).then(res => res.json());
}

async function getManagerJobs(managerid) {
    return fetch(`http://localhost:8080/api/jobs/manager/${managerid}`, {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function updateJob(id, job) {
    return fetch(`http://localhost:8080/api/jobs/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "PUT",
        body: JSON.stringify(job)
    }).then(res => res.json());
}

async function deleteJob(id) {
    return fetch(`http://localhost:8080/api/jobs/${id}`, {
        headers: { "Authorization": token },
        method: "DELETE"
    });
}

// APPLICATIONS

async function getApplications() {
    return fetch("http://localhost:8080/api/applications", {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function getApplicationsByJob(id) {
    return fetch(`http://localhost:8080/api/applications/job/${id}`, {
        headers: { "Authorization": token }
    })
    .then(response => response.json())
}

async function createApplication(app) {
    return fetch("http://localhost:8080/api/applications", {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "POST",
        body: JSON.stringify(app)
    }).then(res => res.json());
}

async function updateApplication(id, app) {
    return fetch(`http://localhost:8080/api/applications/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": token},
        method: "PUT",
        body: JSON.stringify(app)
    }).then(res => res.json());
}

async function deleteApplication(id) {
    return fetch(`http://localhost:8080/api/applications/${id}`, {
        headers: { "Authorization": token },
        method: "DELETE"
    });
}

export {
    login,
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
    createApplication,
    deleteApplication,
    updateApplication
}