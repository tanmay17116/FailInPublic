function createDiv(username, message){

    const block = document.createElement('div');
    block.classList.add("message", "bg-teal-800", "text-yellow-200", "p-4", "rounded-lg");

    const span_username = document.createElement('span');
    const span_message = document.createElement('span');

    span_username.classList.add("username", "font-bold", "block");
    span_username.textContent = username;

    span_message.classList.add("text");
    span_message.textContent = message;

    block.append(span_username, span_message);

    const container = document.getElementById("msgWrapper");
    container.append(block);
}

async function getDataApi(){

    try{

        const response = await fetch("https://fail-in-public-api-yzd5.onrender.com/posts");

        if(!response.ok){
            throw new Error("Can't fetch");
        }

        const data = await response.json();
        const results = data.res;
        const container = document.getElementById("msgWrapper");

        container.innerHTML = "";

        for(let i = results.length - 1; i >= 0; i--){

            createDiv(results[i].username, results[i].message);
        }
    }
    catch(error){

        console.error(error);
    }
}

getDataApi();