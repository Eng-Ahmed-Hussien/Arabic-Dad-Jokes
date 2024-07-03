const jokeElment = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

jokeBtn.addEventListener("click", generateJokeUsingFetch);
generateJokeUsingFetch(); // Initial joke load

function generateJokeUsingFetch() {
  fetch("./assets/data/jokes.tsv") // This File contains 2000 Arabic Jokes in TSV format
    .then((response) => response.text())
    .then((data) => {
      // Split the TSV data into lines
      const lines = data.trim().split("\n");

      // Remove the header line (if exists) and parse jokes
      if (lines.length > 0) {
        const jokes = lines.slice(1).map((line) => {
          const [id, joke, author] = line.split("\t");
          return { id: parseInt(id), joke: joke, author: author };
        });

        // Get a random joke
        const randomJoke =
          jokes[Math.floor(Math.random() * jokes.length)];

        // Display the joke
        jokeElment.textContent = randomJoke.joke;
      } else {
        throw new Error("Empty file or invalid format");
      }
    })
    .catch((error) => {
      jokeElment.textContent =
        "عذراً، حدث خطأ أثناء جلب النكتة. الرجاء المحاولة مرة أخرى لاحقاً.";
      console.error("Error fetching joke:", error);
    });
}
