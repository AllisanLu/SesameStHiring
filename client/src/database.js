// for doing API calls :D

async function getUser(id) {
    return fetch("http://localhost:8080/api/users/5")
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
    getUser,
    createUser,
    createCandidate
}