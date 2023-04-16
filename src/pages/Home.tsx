import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components'
import { FunctionComponent, useEffect, useState } from 'react'

// import CharacterData from '../public/data.json'
import { GLOBALS } from '@/utils'
import { CharacterResponse } from '@/utils/types'

const fetchCharacters = async (
  page: number,
  status: string | null,
  gender: string | null
) => {
  const fetchUrl = new window.URL(`${GLOBALS.BASE_URL}/character/`)
  fetchUrl.searchParams.append('page', `${page}`)
  if (status) {
    fetchUrl.searchParams.append('status', `${status}`)
  }
  if (gender) {
    fetchUrl.searchParams.append('gender', `${gender}`)
  }
  const res = await fetch(fetchUrl.toString())
  if (!res.ok || res.status < 200 || res.status > 210) {
    throw new Error('Something went wrong')
  }
  return res.json() as Promise<CharacterResponse>
}

type Gender = 'male' | 'female' | 'genderless' | 'unknow' | ''
type Status = 'alive' | 'dead' | 'unknown' | ''

export const Home: FunctionComponent = () => {
  const [page, setPage] = useState(1)
  const [gender, setGender] = useState<Gender>('')
  const [status, setStatus] = useState<Status>('')
  const query = useQuery(
    ['characters', page, status, gender],
    () => fetchCharacters(page, status, gender),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    const list = localStorage.getItem(GLOBALS.FAVORITE_CHARACTERS)
    if (!list) {
      localStorage.setItem(GLOBALS.FAVORITE_CHARACTERS, JSON.stringify([]))
    }
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
      <form onSubmit={e => e.preventDefault()} className="flex gap-x-4">
        <select
          aria-label="Select Status of Character. Should be one of 'Alive', 'Dead', 'Unknown'"
          className="block border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          value={status}
          onChange={e => setStatus(e.currentTarget.value as Status)}
        >
          <option value=""> Select Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          aria-label="Select Gender of Character. Should be one of 'Male', 'Female', 'Genderless', 'Unknown'"
          className="block border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          value={gender}
          onChange={e => setGender(e.currentTarget.value as Gender)}
        >
          <option value=""> Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </form>

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
