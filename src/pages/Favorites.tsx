import { Card } from 'components'
import { FunctionComponent, useEffect, useState } from 'react'
import { GLOBALS } from 'utils'
import { Character } from 'utils/types'

const Favorites: FunctionComponent = () => {
  const [, setFavList] = useState<number[]>([])
  const [data, setData] = useState<Character[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    const list = localStorage.getItem(GLOBALS.FAVORITE_CHARACTERS)
    async function getData(lst: number[]) {
      try {
        const res = await fetch(
          `${GLOBALS.BASE_URL}/character/${lst.join(',')}`
        )
        if (!res.ok || res.status < 200 || res.status > 210) {
          throw new Error('Something went wrong')
        }
        const jsonData: Character[] = await res.json()
        setData(jsonData)
        setLoading(false)
      } catch (err) {
        setError(true)
      }
    }
    if (list) {
      setFavList(JSON.parse(list) as number[])
      getData(JSON.parse(list))
    }
    return () => {
      setData([])
      setLoading(true)
      setError(false)
    }
  }, [])

  if (loading) {
    return <span>Loading Your favorite characters...</span>
  }
  if (error) {
    return <span>Error while fetching your favorite characters</span>
  }
  return (
    <div>
      <h1>Favorites: </h1>

      <div className="flex gap-4 flex-wrap my-4">
        {data?.length > 0 ? (
          data?.map(character => {
            return <Card character={character} key={character.id} />
          })
        ) : (
          <span>No favorites yet</span>
        )}
      </div>
    </div>
  )
}

export default Favorites
