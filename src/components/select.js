import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const categories1 = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({categories, setCategories}) {
  const [selected, setSelected] = useState([])
  function updateSelected(index){
    let newArr = [...categories]; 

    let newSel;
    if(newArr[index].selected){
        newSel = selected.filter(name => name !== newArr[index].name)
    } else {
        newSel= [...selected, newArr[index].name]
    }
    console.log(newSel)
    setSelected(newSel)

    newArr[index].selected = !newArr[index].selected;
    setCategories(newArr);

    
  }
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white h-10 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">
                  {selected.map(cat => 
                    <span className="bg-gray-200 rounded-md border border-gray-300 mr-2 p-1">
                        {cat}
                        </span>
                    )}
                </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category, index) => (
                    <div key={category._id} className="ml-3 relative flex items-start py-4">
                        <div className="min-w-0 flex-1 text-sm">
                            <label htmlFor={`category-${category._id}`} className="select-none font-medium text-gray-700">
                            {category.name}
                            </label>
                        </div>
                        <div className="mx-3 flex h-5 items-center">
                            <input
                            id={`category-${category._id}`}
                            name={`category-${category._id}`}
                            type="checkbox"
                            key={category._id}
                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={() => updateSelected(index)}
                            checked={category.selected}
                            />
                        </div>
                    </div>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
