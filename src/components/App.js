import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
//change filter type
  handleChangeFilterType =  (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  findPets = () => {
    let url = '/api/pets'
    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
    .then(res => res.json())
    //.then(pets => this.setState({ pets }))
    .then(pets => this.setState({ pets }))

  }

  petAdoptStatus = (petID) => {
    const findPets = this.state.pets.map((pet) => {
      if (pet !== petID) {
        return{
          ...pet,
          isAdopted: true
        }
      } else {
        return null
      }
    })
    this.setState({
      pets:findPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeFilterType}
               onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} 
              onAdoptPet={this.petAdoptStatus}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App