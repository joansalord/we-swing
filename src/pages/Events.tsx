import { IonAvatar, IonBadge, IonButton, IonCheckbox, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Events.css';
import ListItem from './ListItem';

const Events: React.FC = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<{
    id: string;
    title: string;
    link: string;
    country: string;
    date: string
  }[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8080/process/show")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
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
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center'>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton>Default</IonButton>
        { <IonList> 
          {items.map(item => (
            /* By calling the router this way we are adding the id to the path */
            //<IonItem routerLink={`/listItem/${item.id}`}>
            <IonItem routerLink={'listItem/1'}>
              <IonAvatar slot="start">
                <img src="../../resources/appIcon.png" />
              </IonAvatar>
              <IonLabel>
                <h1 className= "title" >{item.title}</h1>
                <h3>Country: {item.country}</h3>
                <IonNote>Date: {item.date}</IonNote>
              </IonLabel>
            </IonItem>
          ))}
          </IonList> 
          }
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



        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
          
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Events;
