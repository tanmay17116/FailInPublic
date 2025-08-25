let allPosts = [];

const msgWrapper = document.getElementById("msgWrapper");
const sortSelect = document.getElementById("sort-select");
const filterButtonsContainer = document.getElementById("filter-buttons");

async function getDataApi(){

    msgWrapper.innerHTML = `<p id="loading-indicator" class="text-center text-gray-500">Loading fails...</p>`;
    try {
        const response = await fetch("https://fail-in-public-api.onrender.com/posts");
        if (!response.ok) throw new Error("Can't fetch");

        const data = await response.json();
        allPosts = data.res; 
        
        renderPosts();

    } 
    catch(error){

        msgWrapper.innerHTML = `<p class="text-center text-red-500">Could not load fails. Please try again later.</p>`;
        console.error(error);
    }
}

function renderPosts() {

    const sortBy = sortSelect.value;
    const filterBy = document.querySelector(".filter-btn.active").dataset.lang;

    let filteredPosts = [...allPosts];

    if(filterBy !== "All"){

        filteredPosts = filteredPosts.filter(post => post.language && post.language.toLowerCase() === filterBy.toLowerCase());
    }
    if(sortBy === 'newest'){

        filteredPosts.reverse();
    }

    displayPosts(filteredPosts);
}

function createDiv(username, message){
    
    const block = document.createElement('div');
    block.classList.add("message", "bg-teal-800", "text-yellow-200", "p-4", "rounded-lg");
    
    const span_username = document.createElement('span');
    span_username.classList.add("username", "font-bold", "block");
    span_username.textContent = username;

    const span_message = document.createElement('span');
    span_message.classList.add("text");
    span_message.textContent = message;

    block.append(span_username, span_message);
    msgWrapper.append(block);
}

function displayPosts(posts) {

    msgWrapper.innerHTML = '';

    if(posts.length === 0){

        msgWrapper.innerHTML = `<p class="text-center text-gray-500">No fails found for this filter.</p>`;
        return;
    }

    posts.forEach(post => {

        createDiv(post.username, post.message);
    });
}

sortSelect.addEventListener('change', renderPosts);

filterButtonsContainer.addEventListener('click', (event) => {

    if(event.target.classList.contains('filter-btn')){

        document.querySelectorAll('.filter-btn').forEach(btn => {

            btn.classList.remove('active', 'bg-teal-700', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });

        event.target.classList.add('active', 'bg-teal-700', 'text-white');
        event.target.classList.remove('bg-gray-200', 'text-gray-700');

        renderPosts();
    }
});

getDataApi();