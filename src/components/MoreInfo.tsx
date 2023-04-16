import { useQuery } from '@tanstack/react-query'

import { FunctionComponent } from 'react'
import { GLOBALS } from '@/utils'
import { Character, Location, LocationResponse } from '@/utils/types'

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
  if (query.isLoading) {
    return <span>Loading...</span>
  }
  if (query.isError) {
    return <span>Error while fetching character information</span>
  }
  const character = query.data
  return (
    <div>
      <div className="flex gap-x-2">
        <img
          src={character.image}
          alt={character.name}
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
    </div>
  )
}

export default MoreInfo
