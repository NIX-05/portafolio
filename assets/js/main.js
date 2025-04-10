const fetchData = async () => {
    const url = 'https://rickandmortyapi.com/api/character';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const results = json.results;
        
        return results || [];
    } catch (error) {
        console.log('Ocurrió un error ', error);
        return [];
    }
}

function getCard({ image, title, description }) {
    return `
        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
            <img
                src="${image}"
                alt="card-image" class="object-cover w-full h-full" />
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-2">
                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  ${title}
                </p>
                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    $95.00
                </p>
            </div>
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              ${description}
            </p>
        </div>
        <div class="p-6 pt-0">
            <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button">
                Add to Cart
            </button>
        </div>
    `;
}

const sectionDom = document.getElementById("section-list-cards");

fetchData().then(characters => {
    console.log('characters ', characters);
    characters.forEach(element => {
        const createdCard = document.createElement("div");
        createdCard.classList.add("relative", "flex", "flex-col", "text-gray-700", "bg-white", "shadow-md", "bg-clip-border", "rounded-xl", "w-96");
        createdCard.innerHTML = getCard({
            image: element.image,
            title: element.name,
            description: `${element.species} - ${element.status}`
        });
        sectionDom.appendChild(createdCard);
    })
});
