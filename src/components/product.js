import { useState,useEffect } from "react";
import axios from "axios";

export default function Partner() {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res =  await axios.get("http://localhost:8000/categories");
        setCategories(res.data.map(cat => ({ ...cat, "selected": false })))
    }
    fetchData();
  },[]);

  async function createProduct(){
    const selected_categories = categories.filter(cat => cat.selected === true).map(selected => selected._id)
    console.log(selected_categories)
    const res = await axios.post("http://localhost:8000/product", {name: inputValue, categories:selected_categories});
    console.log("server response:", res);
  } 
  
  function updateSelected(index){
    let newArr = [...categories]; 
    newArr[index].selected = !newArr[index].selected;
    setCategories(newArr);
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Add product</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0 ">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block w-full min-w-0 flex-1  rounded-md sm:border sm:border-gray-300 "
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Categories
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0 ">
              <fieldset>
                <div className="mt-4 divide-y divide-gray-200  border-b border-gray-200">
                  {categories.map((category, index) => (
                    <div key={category._id} className="relative flex items-start py-4">
                      <div className="min-w-0 flex-1 text-sm">
                        <label htmlFor={`category-${category._id}`} className="select-none font-medium text-gray-700">
                          {category.name}
                        </label>
                      </div>
                      <div className="ml-3 flex h-5 items-center">
                        <input
                          id={`category-${category._id}`}
                          name={`category-${category._id}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={() => updateSelected(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button            
            type="button"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={createProduct}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
