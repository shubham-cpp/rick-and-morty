import { useQuery } from '@tanstack/react-query'

import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { GLOBALS } from '@/utils'
import {
  Character,
  Episode,
  EpisodeResponse,
  Location,
  LocationResponse
} from '@/utils/types'
import { EpisodeContent } from '@/App'

interface Props {
  id: number
}

const fetchCharacterInfo = async (characterId: number) => {
  const res = await fetch(`${GLOBALS.BASE_URL}/character/${characterId}`)
  if (!res.ok || res.status < 200 || res.status > 210) {
    throw new Error('Something went wrong')
  }
  return res.json() as Promise<Character>
}

const LocationInfo: FunctionComponent<Location & { title: string }> = props => {
  const url = props.url
  const title = props.title
  const query = useQuery(['location', url], async () => {
    const res = await fetch(url)
    if (!res.ok || res.status < 200 || res.status > 210) {
      throw new Error('ERROR: while fetching location information')
    }
    return res.json() as Promise<LocationResponse>
  })
  if (query.isLoading) {
    return <span>Loading {title}...</span>
  }
  if (query.isError) {
    return <span>Error while fetching {title}</span>
  }
  const location = query.data
  return (
    <section>
      <h3>{title}</h3>
      <table className="border-collapse">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{location.name}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{location.type}</td>
          </tr>
          <tr>
            <td>Dimension</td>
            <td>{location.dimension.replace('Dimension', '')}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

const MoreInfo: FunctionComponent<Props> = props => {
  const id = props.id
  const query = useQuery(['characters-info', id], () => fetchCharacterInfo(id))
  // const [episodes, setEpisodes] = useState<Episode[]>([])
  const state = useContext(EpisodeContent)
  const episodes = state ? state[0] : []
  const setEpisodes = state ? state[1] : () => {}

  const character = query.data
  useEffect(() => {
    const ids = query?.data?.episode.map(ep => {
      return parseInt(ep.split('/').at(-1)!)
    })
    const fetchedIds = episodes?.map(ep => {
      return ep.id
    })
    const eps = ids?.filter(id => !fetchedIds.includes(id)).join(',')

    async function fetchEpisodes() {
      const res = await fetch(`${GLOBALS.BASE_URL}/episode/${eps}`)
      if (!res.ok || res.status < 200 || res.status > 210) {
        throw new Error('Something went wrong')
      }
      const fetchedEpisodes: Episode[] = await res.json()
      setEpisodes(
        Array.isArray(fetchedEpisodes) ? fetchedEpisodes : [fetchedEpisodes]
      )
    }
    if (Array.isArray(ids)) fetchEpisodes()
  }, [character])

  if (query.isLoading) {
    return <span>Loading...</span>
  }
  if (query.isError) {
    return <span>Error while fetching character information</span>
  }
  return (
    <div>
      <div className="flex gap-x-2">
        <img
          src={character?.image}
          alt={character?.name}
          className="aspect-square w-1/2"
        />
        <table>
          <tbody>
            <tr>
              <td>Gender</td>
              <td>{character.gender}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{character.status}</td>
            </tr>
            <tr>
              <td>Species</td>
              <td>{character.species}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>
                {character.type.trim().length > 0 ? character.type : 'Unknown'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* url={character.location.url} name={character.location.name}  */}
      <LocationInfo {...character.origin} title="Origin Information" />
      <LocationInfo {...character.location} title="Location Information" />
      <div>
        <h3>Episodes Features In:</h3>
        {episodes?.length > 0 ? (
          episodes?.map(episode => <p key={episode.id}>{episode.name}</p>)
        ) : (
          <p>No episodes</p>
        )}
      </div>
    </div>
  )
}

export default MoreInfo
