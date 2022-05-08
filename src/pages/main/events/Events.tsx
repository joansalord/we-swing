import { IonAvatar, IonBadge, IonButton, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonLoading, IonNote, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import { calendar, search, person, settings, add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Events.css';
import ListItem from './ListItem';
import { logoutUser } from '../../../firebaseConfig'
import { useHistory } from 'react-router';

const Events: React.FC = () => {

  const username = useSelector((state: any) => state.user.username)
  const history = useHistory()

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<{
    id: string;
    title: string;
    website: string;
    country: string;
    town: string;
    date: string;
    styles: string;
    description: string;
  }[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    setIsLoaded(true)
    fetch("http://localhost:8080/process/show")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(false);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(false);
          setError(error);
          console.log(error);
        }
      )
  }, [])

  /*const pushData = () => {
    const max = items.length + 20;
    const min = max - 20;
    const newData = [];
    for (let i = min; i < max; i++) {
      newData.push('Item' + i);
    }
  }

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
      if (items.length === 1000) {
        setInfiniteDisabled(true);
      }
    }, 500);
  }  */

  //console.log(items);

  function addEvent() {
    history.replace('/addEvent')
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events {username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {isLoaded && <IonLoading message="Loading events..." duration={0} isOpen={isLoaded} animated={true}/>}
      <IonContent fullscreen>
        <IonButton>Default</IonButton>
         <IonList> 
          {items.map(item => (
            /* By calling the router this way we are adding the id to the path */
            // <IonItem routerLink={`/listItem/${item.id}`}>
            <IonItem routerLink={'listItem/1'}>
              <IonAvatar slot="start">
                <img src="../../resources/appIcon.png" />
              </IonAvatar>
              <IonLabel>
                <h1 className= "title" >{item.title}</h1>
                <h3>Country: {item.country}</h3>
                <h3>Town: {item.town}</h3>
                <IonNote>Date: {item.date}</IonNote>
                <p>Website: {item.website}</p>
                <p>Styles: {item.styles}</p>
                <p>Description: {item.description}</p>
              </IonLabel>
            </IonItem>
          ))}
          </IonList> 
          
          {/*<IonList>
            {items.map(item => {
              return (
                <IonItem>
                  <IonLabel>{item}</IonLabel>
                </IonItem>
              )
            })}
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>*/}

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton onClick={addEvent}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonTabBar slot="bottom">
          <IonTabButton tab="events" href="/events">
            <IonIcon icon={calendar} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
        </IonTabButton>
        </IonTabBar>
      </IonPage>
  );
};

export default Events;
