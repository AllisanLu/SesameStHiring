// for doing API calls :D

async function getUsers() {
    return fetch("http://localhost:8080/api/users")
    .then(response => response.json())
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
    fetch("http://localhost:8080/api/users", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(console.log("Added user"))

}

async function getCandidates() {
    return fetch("http://localhost:8080/api/candidates")
    .then(response => response.json())
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

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    getCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getManagers
}