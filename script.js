
const output = document.getElementById("output");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);

        img.onerror = () => {
            reject(new Error("Failed to download image: " + url));
        };

        img.src = url;
    });
}

function downloadImages() {
    // Clear previous results and errors
    output.innerHTML = "";
    error.textContent = "";

    // Show loading spinner
    loading.textContent = "⏳ Loading images...";
    loading.style.display = "block";

    // Disable button while downloading
    btn.disabled = true;

    const promises = images.map(image => downloadImage(image.url));

    Promise.all(promises)
        .then(results => {
            results.forEach(img => {
                output.appendChild(img);
            });

            loading.style.display = "none";
        })
        .catch(err => {
            error.textContent = err.message;
            loading.style.display = "none";
        })
        .finally(() => {
            btn.disabled = false;
        });
}

// Start downloading when the button is clicked
btn.addEventListener("click", downloadImages);
