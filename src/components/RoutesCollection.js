import { Route, Switch } from 'react-router-dom'
import Select from './event/Select'
import EventAdd from './event/Add'
import SignIn from './auth/SignIn'
import Clock from './event/Clock'
import SendSlides from './event/SendSlides'
import Rate from './event/Rate'
import AddSlides from './event/AddSlides'
import MySlides from './event/MySlides'
import SlideGrid from './event/SlideGrid'

// <Route path=’/path’ component={ComponentName}/>
import React from 'react'


const RoutesCollection = () => {
  return (
    <Switch>

<Route exact path='/' component={Select}/>

<Route path='/event/add' component={EventAdd}/>

<Route path='/signin' component={SignIn}/>

<Route path='/clock/:eventId' component={Clock}/>

<Route path='/event/sendSlides' component={SendSlides}/>
<Route path='/event/rate' component={Rate}/>
<Route path='/event/addslide' component={AddSlides}/>
<Route path='/event/myslides' component={MySlides}/>
<Route path='/event/slides/:eventId' component={SlideGrid}/>

</Switch>
  )
}

export default RoutesCollection


