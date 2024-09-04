// for doing API calls :D

async function getUsers() {
    const newUsers = await fetch("http://localhost:8080/api/users")
    .then(response => response.json())
    return newUsers;
}

async function getUser(id) {
    return fetch(`http://localhost:8080/api/users/${id}`)
    .then(response => response.json())
}

async function updateUser(id, user) {
    fetch(`http://localhost:8080/api/users/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function createUser(user) {
    return fetch("http://localhost:8080/api/users", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(response => response.json())

}

async function getCandidates() {
    return fetch("http://localhost:8080/api/candidates")
    .then(response => response.json())
}

async function getCandidate(id) {
    return fetch(`http://localhost:8080/api/candidates/${id}`)
    .then(response => { 
        if (response.ok)
            return response.json()
        return null
     })
}

async function createCandidate(id, candidate) {
    return fetch("http://localhost:8080/api/candidates", {
        headers: { "Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({...candidate, id})
    }).then(res => res.json());
}

async function updateCandidate(id, candidate) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        headers: { "Content-Type": "application/json"},
        method: "PUT",
        body: JSON.stringify({...candidate, id})
    }).then(res => res.json());
}

async function deleteCandidate(id) {
    return fetch(`http://localhost:8080/api/candidates/${id}`, {
        method: "DELETE"
    }).then(res => res.json());
}

async function getManagers() {
    return fetch("http://localhost:8080/api/managers")
    .then(response => response.json())
}

async function getManager(id) {
    return fetch(`http://localhost:8080/api/managers/${id}`)
    .then(response => { 
        if (response.ok)
            return response.json()
        return null
     })
}

async function createManager(id, manager) {
    return fetch("http://localhost:8080/api/managers", {
        headers: { "Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({...manager, id})
    }).then(res => res.json());
}

async function updateManager(id, manager) {
    return fetch(`http://localhost:8080/api/managers/${id}`, {
        headers: { "Content-Type": "application/json"},
        method: "PUT",
        body: JSON.stringify({...manager, id})
    }).then(res => res.json());
}

export {
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
    updateManager
}