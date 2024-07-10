const accessKey = "w-vNm8lqEaWP8m_dkNQdoKEO34VHnUMvByFIyVo4sq4";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value; // Corrected this line
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1 && results.length > 0) {
    searchResult.innerHTML = "";
    showMoreBtn.style.display = "block";
  }

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  if (results.length === 0) {
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = "";
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
