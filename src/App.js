import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelGuide from './Components/TravelGuide'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isLoading: true, dataList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({isLoading: false, dataList: formatData})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  sucessView = () => {
    const {dataList} = this.state
    return (
      <ul className="list-container">
        {dataList.map(e => (
          <TravelGuide details={e} key={e.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Travel Guide</h1>
        <div className="destinations">
          {isLoading ? this.loadingView() : this.sucessView()}
        </div>
      </div>
    )
  }
}

export default App
