import { useState } from "react";
import axios from "axios";
import Modal from '../common/modal'

export default function Partner() {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [positive, setPositive] = useState(true);

    async function createPartner(){
        if( inputValue===''){
            setOpen(true);
            setTitle("URL cant be empty");
            setContent("To create a partner we need a URL");
            setPositive(false)
            return;
        }
        const res = await axios.post("http://localhost:8000/partner", {url: inputValue});
        if(res.status === 200){
            setTitle("Partner added");
            setContent("The partner has been created succesfully");
            setPositive(true)
        }
        else {
            setTitle("Error");
            setContent("There has been an error please try again");
            setPositive(false)
        }
        setOpen(true);
        console.log("server response:", res);
      }
    return (
      <form className="px-4 sm:px-6 lg:px-8 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Add partner</h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  URL
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0 ">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block w-full min-w-0 flex-1 py-1 px-2 rounded-md sm:border sm:border-gray-300 "
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div className="items-end">
                    <button
                        type="button"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 self-end"
                        onClick={createPartner}
                        >
                        Save
                    </button>
                </div>
              </div>
            </div>
          </div>
          <Modal open={open} setOpen={setOpen} title={title} content={content} positive={positive}/>
        </div>
      </form>
    )
  }
  