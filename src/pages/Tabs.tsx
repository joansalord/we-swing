import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, ellipse, person } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import Events from "./main/Events";
import Profile from "./main/Profile";
import Tab2 from "./main/Tab2";

const Tabs: React.FC = () => {
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/events" />
          <Route path="/events" render={() => <Events/>} exact={true}/>
          <Route path="/tab2" render={() => <Tab2/>} exact={true}/>
          <Route path="/profile" render={() => <Profile/>} exact={true}/>
        </IonRouterOutlet>
        
        <IonTabBar slot="bottom">
          <IonTabButton tab="events" href="/events">
            <IonIcon icon={calendar} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  };
  
  export default Tabs;