// for doing API calls :D

async function getUsers() {
    return fetch("http://localhost:8080/api/users")
    .then(response => response.json())
}

async function getUser(id) {
    return fetch("http://localhost:8080/api/users/{id}")
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

async function createCandidate(id, candidate) {
    return fetch("http://localhost:8080/api/candidates", {
        headers: { "Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({...candidate, id})
    });
}

export {
    getUsers,
    getUser,
    createUser,
    createCandidate
}