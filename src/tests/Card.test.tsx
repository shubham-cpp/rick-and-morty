import { render, screen, fireEvent } from '@testing-library/react'
import { Card } from '@/components'
import { Character } from '@/utils/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()
describe('<Card />', () => {
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
        <Card character={character} />
      </QueryClientProvider>
    )
  })
  afterAll(() => {
    client.clear()
  })
  it('should render the Navbar', () => {
    expect(screen.getByText(/view more/i)).toBeInTheDocument()
  })
  it('should render the Add to Favorites Button', () => {
    expect(screen.getByLabelText(/Add to Favorites/i)).toBeInTheDocument()
  })
  it('should render the Rick Sanchez', () => {
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument()
  })
  it('should render the Features in 2 eps', () => {
    expect(screen.getByText(/2 eps/i)).toBeInTheDocument()
  })
  it('should render the Status Alive', () => {
    expect(screen.getByText(/Alive/i)).toBeInTheDocument()
  })
  it('should render the Close Button', async () => {
    fireEvent.click(screen.getByText('View More', { exact: false }))
    expect(await screen.findByText('Close')).toBeInTheDocument()
  })
})
