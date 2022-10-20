import axios from "axios";
import { useState } from "react";
import categoriesDB from "./jsons/categories.json"
import productsDB from "./jsons/products.json"
import partnerDB from "./jsons/partners.json"
import { v4 as uuid } from 'uuid';
export default function App() {

  const headers = {
    'Accept': "application/json",
    "Content-Type": "application/json",
    'Authorization':
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzkzNWQwZmUzYWJhZWY3Mjk1NWE3MmE2OGQ5N2Y3MWE3NTA5M2RiMGQ1NGM3ZGNjYWRlMGRkNjUzYzkyYmEyMzBhZTlkZTM1NDc5OTA1YzgiLCJpYXQiOjE2NjYwODg3ODAsIm5iZiI6MTY2NjA4ODc4MCwiZXhwIjoxNjk3NjI0NzgwLCJzdWIiOiI4NDk4Iiwic2NvcGVzIjpbXX0.RLoOoeQy7UEdsAzJn1JCwCZ_0NZhpDuTrHBT6R6eAfDUtjkTioQRkK2azeOPs4A9KHtbj9sGYVzl6dsJrnuxPw"
  };

  const [inputValue, setInputValue] = useState("");
  const [productId, setProductId] = useState("");
  const [categori, setCategories] = useState([]);

  function sendPost() {
    axios.post("https://www.klazify.com/api/categorize", {
      url: inputValue
    }, { headers }).then((response) => setCategories(response.data.domain.categories));
    return categori.map(elem => elem.name);
  };

  function getCategories(filtered) {
    return categoriesDB.filter(element => filtered.includes(element.name)).map(elem => elem.id);
  }

  function getProducts(categors) {
    const productIDs = [];
    productsDB.forEach(product => {
      if (product.categories.some(r => categors.includes(r))) {
        productIDs.push(product.id)
      }
    }
    );
    return (productIDs);
  }

  function createPartner() {
    const filtered = sendPost();
    console.log('categories:', JSON.stringify(filtered));
    // const filtered = [{"confidence":0.97,"name":"/People & Society/Family & Relationships/Family"},{"confidence":0.76,"name":"/Health/Reproductive Health"},{"confidence":0.73,"name":"/Health/Women's Health"}].map(elem => elem.name);
    const categories = getCategories(filtered);
    const products = getProducts(categories);
    const unique_id = uuid();
    const newPartner = {
      categories: categories,
      products: products,
      link: inputValue
    }
    console.log(JSON.stringify(newPartner));
  }

  function updatePartners() {
    const prodCtas = productsDB.find(elem => elem.id === productId).categories;
    partnerDB.forEach(part => {
      if (part.categories.some(r => prodCtas.includes(r))) {
        part.products.push(productId);
      }
    })
    console.log(partnerDB);
  }
  async function getQuote() {
    const response = await axios.get("http://localhost:8000/test");
    console.log(response);
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Enter the webpage you want to analyse</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={createPartner}>Search</button>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={getQuote}>UPDATE</button>
    </div>
  );
}
