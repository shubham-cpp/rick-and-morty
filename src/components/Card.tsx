import { GLOBALS } from '@/utils'
import { Character } from '@/utils/types'
import { Dialog } from '@headlessui/react'
import { FunctionComponent, useState } from 'react'
import MoreInfo from './MoreInfo'

interface Props {
  character: Character
}

const Card: FunctionComponent<Props> = props => {
  const buttonTitle = 'Add to Favorites'
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const addToFavorites = () => {
    let favs: number[] = []
    setAdded(!added)
    const list = localStorage.getItem(GLOBALS.FAVORITE_CHARACTERS)
    if (list) {
      favs = JSON.parse(list) as number[]
      favs.push(props.character.id)
      // Remove character from favorites if we've already added
      if (added) favs = favs.filter(fav => fav !== props.character.id)
      localStorage.setItem(GLOBALS.FAVORITE_CHARACTERS, JSON.stringify(favs))
    }
  }
  const favoriteCharacters = () => {
    const favs = localStorage.getItem(GLOBALS.FAVORITE_CHARACTERS)
    if (!favs) return []
    return JSON.parse(favs) as number[]
  }
  const closeOpen = () => setOpen(false)

  const isFavorite = favoriteCharacters().includes(props.character.id)
  const featuredIn = props.character.episode.length
  const isAlive = props.character.status === 'Alive'

  return (
    <>
      <article className="grid grid-cols-3 gap-2 px-1 py-1 rounded-md bg-third text-white border-2 border-light shadow-light shadow-md max-w-sm">
        <img
          src={props.character.image}
          alt={props.character.name}
          className="col-span-1 h-full rounded-md object-cover"
        />
        <aside className="col-span-2">
          <div className="flex justify-between">
            <h4 className="flex gap-x-2">
              <span className="text-white opacity-60">Name</span>
              <span>{props.character.name}</span>
            </h4>
            <button
              type="button"
              title={buttonTitle}
              aria-label={buttonTitle}
              onClick={addToFavorites}
            >
              <span className="material-icons">{`${
                isFavorite ? 'favorite' : 'favorite_border'
              }`}</span>
            </button>
          </div>
          <p>
            <span className="text-white opacity-60">Status </span>
            <span
              className={
                isAlive
                  ? 'border-b-2 border-b-green-500'
                  : 'border-b-2 border-b-red-500'
              }
            >
              Alive
            </span>
          </p>
          <p>
            <span className="text-white opacity-60">Featured in </span>
            <span>
              {featuredIn} {featuredIn !== 1 ? 'eps' : 'ep'}{' '}
            </span>
          </p>
          <p>
            <span className="text-white opacity-60">Gender </span>
            <span>{props.character.gender}</span>
          </p>
          <p className="flex items-center">
            <span className="text-white opacity-60 material-icons">
              location_on{' '}
            </span>
            <span>{props.character?.location?.name}</span>
          </p>
          <button
            className="text-blue-100 w-full text-right underline underline-offset-4"
            aria-label={`Open dialog modal with more info about ${props.character.name}`}
            onClick={() => setOpen(true)}
          >
            View more
          </button>
        </aside>
      </article>
      <Dialog open={open} onClose={closeOpen} className="relative z-50 ">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel
              className="mx-auto min-w-[320px] max-w-lg rounded bg-primary text-white"
              style={{ minWidth: 'min(calc(100% - 2rem),35rem)' }}
            >
              <Dialog.Title className="flex justify-between items-center bg-secondary text-white py-2 mb-2">
                <span className="font-bold font-serif text-center flex-grow">
                  {props.character.name}
                </span>
                <button
                  type="button"
                  onClick={closeOpen}
                  className="material-icons"
                >
                  close
                </button>
              </Dialog.Title>
              <MoreInfo id={props.character.id} />
              <button
                type="button"
                className="w-full text-right px-2 py-1 group"
                onClick={closeOpen}
              >
                <span className="bg-blue-700 p-1 mx-2 my-2 text-white rounded-md group-hover:opacity-50 group-hover:font-semibold">
                  Close
                </span>
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Card
