//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
	return new Promise((resolve ,reject) =>{
		const img = new Image();

		img.src = url;

		img.onload = () => resolve(img);

		img.onerror = () => reject(
			new Error("Failed to download image: " + url)
		);
	});
}

function downloadImages(){
	output.innerHTML = "";
	error.textContent = "";
	loading.textContent = "Loading images...";
	loading.style.display = "block";

	const promises = images.map(images =>
		downloadImage(image.url)
		);
	Promise.all(promises)
	.then(results => {
		results.forEach(img => {
			output.appendChild(img);
		});
			
		});
	.catch(err => {
		error.textContent = err.message;
	})
	.finally(() => {
		loading.style.display ="none";
	});

	
}
btn.addEventListener("click", downloadImages);
