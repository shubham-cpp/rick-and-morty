import { Tab } from '@headlessui/react'
import { Favorites, Home } from 'pages'
import { Fragment, FunctionComponent } from 'react'
import { TabListItem } from 'utils/types'

// icons should include classes like "fa-solid fa-house" from fontawesome 6 icons
const tabList: TabListItem[] = [
  { component: <Home />, title: 'Home', icon: 'home' },
  { component: <Favorites />, title: 'Favorites', icon: 'favorite' }
]

const App: FunctionComponent = () => {
  return (
    <Tab.Group as="main" className="mx-auto max-w-screen-2xl">
      <Tab.List className="flex gap-4 mx-auto max-w-fit my-4 bg-slate-50 shadow-md shadow-slate-300">
        {tabList.map(({ title, icon }) => (
          <Tab as={Fragment} key={`${title}-${crypto.randomUUID()}`}>
            {({ selected }) => (
              <button
                className={`${selected ? 'bg-purple-600 text-white' : 'bg-white text-black'
                  } flex gap-2 items-center rounded-md px-2 py-1`}
              >
                <span className="material-icons">{icon}</span>
                <span className="font-serif font-bold text-lg">{title}</span>
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="flex gap-4">
        {tabList.map(({ component, title }) => (
          <Tab.Panel key={`${title}-${crypto.randomUUID()}`}>
            {component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default App
