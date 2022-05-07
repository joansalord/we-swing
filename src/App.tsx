import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, ellipse, person, square, triangle } from 'ionicons/icons';
import Events from './pages/main/events/Events';
import Tab2 from './pages/main/Tab2';
import Profile from './pages/main/profile/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ListItem from './pages/ListItem';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './firebaseConfig'
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import EditProfile from './pages/main/profile/EditProfile';
import AddEvent from './pages/main/events/AddEvent';

setupIonicReact();

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/events" component={Events}/>
      <Route path="/addEvent" component={AddEvent} />
      <Route path="/tab2" component={Tab2}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/editProfile" component={EditProfile}/>
      {/* With this path the id becomes modular. It will be passed
      to the component for further usage. */}
      <Route path="/listItem/:id" component={ListItem} />
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
   getCurrentUser().then((user: any) => {
     if (user) {
       dispatch(setUserState(user.email))
       window.history.replaceState({}, '', '/events')
     } else {
       window.history.replaceState({}, '', '/')
     }
     setBusy(false)
   })
  }, [])

  return (
  <IonApp>
    {busy ? <IonSpinner /> :<RoutingSystem />}
  </IonApp>
  );
};

export default App;
