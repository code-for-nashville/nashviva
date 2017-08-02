import React from 'react'

class App extends React.Component {
  render () {
    return (
      <div>
        <nav>
          <header>
            <h1 className='nashviva'>NashViva!</h1>
            <h2>The Swiss Army Knife For Nashville Life</h2>
          </header>
          <div className='app-description'>
            <p>Click on the switches below to see your snapshot of Nashville's amenities</p>
          </div>
          <ul id='data-toggles' />
        </nav>
      </div>
    )
  }
}

export default App
