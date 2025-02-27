document.addEventListener("DOMContentLoaded", function () {
    const jokesContainer = document.getElementById("jokesContainer");
    const reloadButton = document.getElementById("reloadJokes");

    if (!jokesContainer || !reloadButton) {
        console.error("Error: No se encontró el contenedor de chistes o el botón.");
        return;
    }

    async function fetchJokes() {
        const apiUrl = "https://v2.jokeapi.dev/joke/Any?lang=es&blacklistFlags=nsfw&type=twopart&idRange=6&amount=10";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const data = await response.json();
            if (!data.jokes || data.jokes.length === 0) {
                jokesContainer.innerHTML = "<p>No hay chistes disponibles en este momento.</p>";
                return;
            }

            jokesContainer.innerHTML = ""; // Limpiar chistes anteriores

            data.jokes.forEach(joke => {
                if (!joke.setup || !joke.delivery) return; // Validar estructura de la API

                const jokeElement = document.createElement("div");
                jokeElement.classList.add("joke");
                jokeElement.innerHTML = `
                    <p class="setup"><strong>${joke.setup}</strong></p>
                    <p class="delivery">${joke.delivery}</p>
                `;
                jokesContainer.appendChild(jokeElement);
            });

        } catch (error) {
            jokesContainer.innerHTML = "<p>Error al cargar los chistes.</p>";
            console.error("Error en la API:", error);
        }
    }

    // Cargar chistes al inicio
    fetchJokes();

    // Recargar chistes al hacer clic en el botón
    reloadButton.addEventListener("click", fetchJokes);
});
