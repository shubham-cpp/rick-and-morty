import { Favorites, Home } from '@/pages'
import { TabListItem } from '@/utils/types'
import { Tab } from '@headlessui/react'
import { Fragment, FunctionComponent } from 'react'

// icons should include classes like "fa-solid fa-house" from fontawesome 6 icons
const tabList: TabListItem[] = [
  { component: <Home />, title: 'Home', icon: 'home' },
  { component: <Favorites />, title: 'Favorites', icon: 'favorite' }
]

const App: FunctionComponent = () => {
  return (
    <Tab.Group as="main" className="mx-auto max-w-screen-2xl">
      <Tab.List className="flex mx-auto max-w-fit my-4 shadow-md shadow-light bg-primary">
        {tabList.map(({ title, icon }) => (
          <Tab as={Fragment} key={`${title}-${crypto.randomUUID()}`}>
            {({ selected }) => (
              <button
                className={`${
                  selected ? 'bg-light text-white' : 'bg-primary text-white'
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
          <Tab.Panel key={`${title}-${crypto.randomUUID()}`} className="w-full">
            {component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default App
