let BASE_URL = `http://localhost:3000/users`;
let cards = document.querySelector(".cards");
let searchInput = document.querySelector(".search");
let sortBtn = document.querySelector(".sort");
let loadMore = document.querySelector(".loadmore");
let arrowBtn = document.querySelector(".arrowbtn");
let menuicon = document.querySelector(".menuicon");
let nav = document.querySelector(".nav-mobile");
let maxlength = 3;
let sorted = "asc";
let filteredArr = [];
let copyArr = [];

async function getAllCards() {
  let res = await axios(BASE_URL);
  let data = res.data;
  copyArr = data;
  cards.innerHTML = "";
  filteredArr = filteredArr.length || searchInput.value ? filteredArr : data;
  filteredArr.slice(0, maxlength).forEach((el) => {
    cards.innerHTML += `
        <div class="col col-md-4 col-12 mt-4">
        <div class="card">
          <img width="60px" src="${el.photo}" alt="" />
          <div class="card-body">
            <h5>${el.title}</h5>
            <p>
              ${el.about}
            </p>
            <span>${el.price}$</span>
            <a class="btn btn-primary m-3" href="./details.html?id=${el.id}" >LEARN MORE</a>
            <div>
              <a onclick=deleteBtn(${el.id}) class="btn btn-danger" >DELETE</a>
              <a onclick="editBtn(${el.id})" class="btn btn-secondary" href="./add.html?id=${el.id}">EDİT</a>
              <a onclick="addFav(${el.id})" class="btn btn-dark" >ADD FAV</a>
            </div>
          </div>
        </div>
      </div>
        `;
  });
}
getAllCards();

searchInput.addEventListener("input", function (e) {
  filteredArr = copyArr;
  filteredArr = filteredArr.filter((el) =>
    el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getAllCards();
});

sortBtn.addEventListener("click", function () {
  if (sorted === "asc") {
    filteredArr.sort((a, b) => a.price - b.price);
    sorted = "dsc";
    sortBtn.innerHTML = "SORT ASC";
  } else if (sorted === "dsc") {
    filteredArr.sort((a, b) => b.price - a.price);
    sorted = "def";
    sortBtn.innerHTML = "SORT DSC";
  } else {
    filteredArr = copyArr;
    sorted = "asc";
    sortBtn.innerHTML = "SORT";
  }
  getAllCards();
});

function deleteBtn(id) {
  axios.delete(`${BASE_URL}/${id}`);
}

async function addFav(cardId) {
  let res = await axios(`${BASE_URL}/${cardId}`);
  let obj = await res.data;

  axios.post(`http://localhost:3000/favorites`, obj);
}

loadMore.addEventListener("click", function () {
  maxlength = maxlength + 3;
  getAllCards(filteredArr);
});

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    arrowBtn.style.display = "block";
    document.querySelector(".top-header").style.display = "none";
  } else {
    arrowBtn.style.display = "none";
    document.querySelector(".top-header").style.display = "block";
  }
}

window.addEventListener("scroll", function () {
  scrollFunction();
});

arrowBtn.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

menuicon.addEventListener("click", function () {
  nav.classList.toggle("show");
});
