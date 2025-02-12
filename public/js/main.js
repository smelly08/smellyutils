addEventListener("load", (event) => {
    document.getElementById("main").innerHTML = `
        <h1>Profile</h1>
        <input type="text" id="username" placeholder="Enter Minecraft Username">
        <button id="fetch-btn">Get stats</button>
        <div id="stats"></div>
    `;
});
let btnEl = document.getElementById("fetch-btn");
btnEl?.addEventListener("click", async () => {
    const username = document.getElementById('username').value;

    // Check if the username is empty
    if (!username) {
        document.getElementById('stats').innerText = "Please enter a username.";
        return;
    }
    
    document.getElementById('stats').innerText = "Fetching...";
    try {
        // Fetch stats from the API
        const response = await fetch(`https://sky.shiiyu.moe/api/v2/profile/${username}`);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error("User not found or an error occurred.");
        }

        const data = await response.json();
        
        // Display the fetched JSON in the stats div
        document.getElementById('stats').innerText = JSON.stringify(data, null, 2); // Pretty print JSON
    } catch (error) {
        document.getElementById('stats').innerText = "Trying CORS alternative...";
        try {
            // Fetch stats from the API
            const response = await fetch(`https://api.codetabs.com/v1/tmp/?quest=https://sky.shiiyu.moe/api/v2/profile/${username}`);
            
            // Check if the response is okay
            if (!response.ok) {
                throw new Error("User not found or an error occurred.");
            }
    
            const data = await response.json();
            
            // Display the fetched JSON in the stats div
            document.getElementById('stats').innerText = JSON.stringify(data, null, 2); // Pretty print JSON
        } catch (error) {
            document.getElementById('stats').innerText = error.message;
        }
    }
});
