// p_         переменная
// m_         массив
// f_         функция
// id_        id
// 0_         объект массива
// c_ s_      class(style)

//              ИНИЦИАЛИЗАЦИЯ ВНЕШНИХ ПЕРЕМЕННЫХ:
let p_num = 0;
let p_category = "";
let p_id = "";
let p_price = "";
let p_image = "";
let p_description = "";
let p_title = "";
let o_product = "";
let m_products_1 = [];
let p_product = "";
let m_category = [];
let p_element = "";
let p_reset = document.getElementById("id_reset");

//Получение данных
f_fromAPI();

//                          ФУНКЦИИ:

// Функция получение данных от Fake Store API с добавлением в массив
function f_fromAPI() {
  try {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => ((m_products_1 = json), f_categories(), f_fromArray()));
  } catch (err) {
    alert(`Ошибка получения данных от Fake Store API `);
  }
}

// Функция добавления элемента в секцию
function f_toSection() {
  p_product = document.getElementById("id_product");
  p_product.innerHTML += `
  <div class="s_0" id = "id_1">
    <div class="s_1"><img class="s_image" src="${p_image}" alt="">
    </div>
    <div class="s_2">Title: ${p_title}</div>
    <div class="s_3">Price: ${p_price}</div> 
    <div class="s_4">Description: ${p_description}</div>
    <div class="s_5">Category: ${p_category}</div>
    <div class="s_8">ID: ${p_id}</div>
    <div class="s_9"><button class = "c_button_del" onclick="f_delProdAPI(${p_id})">Удалить товар</button></div>
    </div>
    `;
}

// Функция подготовка карточек товара и вывод на экран
function f_fromArray() {
  let x = "";
  if (m_products_1.length < 6) {
    x = m_products_1.length;
  } else {
    x = 6;
  }
  for (let i = 0; i < x; i++) {
    p_image = m_products_1[p_num].image;
    p_title = m_products_1[p_num].title;
    p_category = m_products_1[p_num].category;
    p_id = m_products_1[p_num].id;
    p_price = m_products_1[p_num].price;
    p_description = m_products_1[p_num].description;
    f_toSection();
    p_num = p_num + 1;
  }
}

// Функция добавления товара в Fake Store API
function f_addProduct() {
  p_title = document.getElementById("id_input_title").value;
  p_price = document.getElementById("id_input_price").value;
  p_description = document.getElementById("id_input_description").value;
  p_category = document.getElementById("id_input_category").value;

  try {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: p_title,
        price: p_price,
        description: p_description,
        // image: "https://i.pravatar.cc",
        category: p_category,
      }),
    })
      .then((res) => res.json())
      .then(
        (json) => (
          console.log(json),
          alert(
            `${p_title} добавлен в Fake Store API в категорию ${p_category} по цене ${p_price}`
          )
        )
      );
  } catch (err) {
    alert(`Ошибка добавления товара в Fake Store API `);
  }
}

// Функция удаление одного товара
function f_delProdAPI(p_DP) {
  fetch("https://fakestoreapi.com/products/" + p_DP, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(
      (json) => console.log(json),
      alert(`Ответ от FakeStoreAPI получен, товар ID# ${p_DP}  удален`)
    );
}

// Функция получения списка категорий
try {
  function f_categories() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => ((m_category = json), f_categories_from_array()));
  }
} catch (err) {
  alert(`Ошибка при получении категорий товара`);
}

// Функция выбора категорий по одной
function f_categories_from_array() {
  for (let i = 0; i < m_category.length; i++) {
    const p_element = m_category[i];
    // привязка к секции
    let p_category = document.getElementById("id_category");
    // заполнение секции
    p_category.innerHTML += `
      <option value="${p_element}"></option>
      `;
  }
}

// Функция фильтрации по категориям
function f_filter_category() {
  try {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        document.getElementById("id_Input").value
    )
      .then((res) => res.json())
      .then(
        (json) => (
          (m_products_1 = json),
          (p_num = 0),
          (p_product.innerHTML = ``),
          (document.getElementById("id_Input").value = ""),
          f_fromArray(),
          (p_reset.innerHTML = `<button class="c_but" onclick="f_reset()">Отменить фильтрацию</button>`)
        )
      );
  } catch (err) {
    alert(`Ошибка фильтрации по категориям`);
  }
}

// Функция отмены фильтрации
function f_reset() {
  // привязка к секции
  let p_category = document.getElementById("id_category");
  p_category.innerHTML = ``;
  p_product.innerHTML = ``;
  p_num = 0;
  f_fromAPI();
  p_reset.innerHTML = ``;
}
