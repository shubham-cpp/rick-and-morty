import { MoreInfo } from '@/components'
import { Character } from '@/utils/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

const client = new QueryClient()
describe('<MoreInfo />', () => {
  const character: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  }
  beforeEach(() => {
    render(
      <QueryClientProvider client={client}>
        <MoreInfo id={character.id} />
      </QueryClientProvider>
    )
  })
  afterAll(() => {
    client.clear()
  })
  it('should render the Image', async () => {
    expect(await screen.findByAltText(/Rick Sanchez/i)).toBeInTheDocument()
  })
  it('should render the Gender to Male', async () => {
    expect(await screen.findByText(/Male/i)).toBeInTheDocument()
  })
  it('should render the Origin Info', async () => {
    expect(await screen.findByText('Name: Earth (C-137)')).toBeInTheDocument()
  })
})
