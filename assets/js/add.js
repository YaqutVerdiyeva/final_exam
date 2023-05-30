let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = `http://localhost:3000/users`;
let titleInput = document.querySelector(".title");
let aboutInput = document.querySelector(".about");
let priceInput = document.querySelector(".price");
let photoInput = document.querySelector(".photo");
let addBtn = document.querySelector(".addbtn");

axios(`${BASE_URL}/${id}`).then((res) => {
  (titleInput.value = res.data.title),
    (aboutInput.value = res.data.about),
    (priceInput.value = res.data.price);
  addBtn.innerHTML = "EDIT";
});

addBtn.addEventListener("click", function () {
  if (!id) {
    axios.post(`${BASE_URL}`, {
      title: titleInput.value,
      about: aboutInput.value,
      price: priceInput.value,
      photo: `./assets/image/${photoInput.value.split("\\")[2]}`,
    });
  } else {
    axios.patch(`${BASE_URL}/${id}`, {
      title: titleInput.value,
      about: aboutInput.value,
      price: priceInput.value,
      photo: `./assets/image/${photoInput.value.split("\\")[2]}`,
    });
  }
});
