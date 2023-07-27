// fetch user from userId. null if not found.
export function getUserById(userId) {
    const data = {
        userId: userId
    };

    return fetch("/getUserById", { // Step 1: Return the fetch promise
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status === 200) return response.json();
            else if (response.status === 404) throw new Error("User not found");
        })
        .then((userObj) => {
            return userObj; // Step 2: Return the userObj
        })
        .catch((error) => {
            alert(error.message);
        });
}
