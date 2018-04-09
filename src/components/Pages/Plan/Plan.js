import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Trips from './Trips'
import Itinerary from './Itinerary'

const Plan = () => (
  <plan>
    <Switch>
      <Route exact path='/plan' component={Trips}/>
      <Route path='/plan/:number' render={(props) => (
        <Itinerary {...props}
          title = 'Itinerary'
          description = "Description" />
      )}/>
    </Switch>
  </plan>
)

export default Plan
