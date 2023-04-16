import { useQuery } from '@tanstack/react-query'
import { Card } from 'components'
import { FunctionComponent, useEffect, useState } from 'react'

// import CharacterData from '../public/data.json'
import { GLOBALS } from 'utils'
import { CharacterResponse } from 'utils/types'

const fetchCharacters = async (page: number) => {
  const res = await fetch(`${GLOBALS.BASE_URL}/character?page=${page}`)
  if (!res.ok || res.status < 200 || res.status > 210) {
    throw new Error('Something went wrong')
  }
  return res.json() as Promise<CharacterResponse>
}

export const Home: FunctionComponent = () => {
  const [page, setPage] = useState(1)
  const query = useQuery(['characters', page], () => fetchCharacters(page))

  useEffect(() => {
    localStorage.setItem(GLOBALS.FAVORITE_CHARACTERS, JSON.stringify([]))
  }, [])

  const nextPage = () => setPage(prev => prev + 1)
  const previousPage = () => setPage(prev => prev - 1)
  const isPrevDisabled = page === 1
  const isNextDisabled = query?.data?.info.next === null

  if (query.isLoading) {
    return <span>Loading...</span>
  }
  if (query.isError) {
    return <span>Error fetching all characters</span>
  }

  return (
    <>
      <div className="flex gap-4 flex-wrap my-4">
        {query.data.results.map(character => {
          return <Card character={character} key={character.id} />
        })}
      </div>
      <footer className="flex items-center gap-x-4">
        <button
          type="button"
          aria-label="Previous Page"
          title="Previous Page"
          className={`flex items-center font-bold bg-purple-500 px-2 py-1 rounded-md text-white 
            ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={previousPage}
          disabled={isPrevDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Previous</span>
        </button>
        <button
          type="button"
          aria-label="Next Page"
          title="Next Page"
          className={`flex items-center font-bold bg-purple-500 px-2 py-1 rounded-md text-white 
            ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isNextDisabled}
          onClick={nextPage}
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </footer>
    </>
  )
}

export default Home
