
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(
            new Error("Failed to download image")
        );

        img.src = url;
    });
}

function downloadImages() {
    output.innerHTML = "";
    error.textContent = "";

    // Show loading spinner before downloads start
    loading.style.display = "block";
    loading.innerHTML = "⏳ Loading images...";

    const promises = images.map(image =>
        downloadImage(image.url)
    );

    Promise.all(promises)
        .then(results => {
            results.forEach(img => {
                output.appendChild(img);
            });

            // Hide spinner after successful download
            loading.style.display = "none";
        })
        .catch(err => {
            error.textContent = err.message;

            // Hide spinner if download fails
            loading.style.display = "none";
        });
}

btn.addEventListener("click", downloadImages);
