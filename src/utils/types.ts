export type TabListItem = {
  title: string
  icon?: string
  component: JSX.Element
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface CharacterResponse {
  info: Info
  results: Character[]
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}
export interface LocationResponse extends Location {
  id: number
  type: string
  dimension: string
  residents: string[]
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface EpisodeResponse {
  info: Info
  results: Episode[]
}
