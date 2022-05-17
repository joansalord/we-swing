import { IonAvatar, IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonRow, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import { calendar, search, person } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {

  const [name, setName] = useState<string>();

  const [error, setError] = useState(null);
  const [items, setItems] = useState<{
    username: string,
    fullName: string,
    email: string,
    gender: string,
    country: string,
    language: string,
    date: string
  }[]>([]);

  function searchUsers() {
    //Fetch by name.
    fetch(`http://localhost:40500/process/getProfileList/${name}`)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
          console.log(error);
        }
      )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='mainDiv'>
          <IonRow>
            <IonCol size='8'>
              <IonInput value={name} placeholder="Enter name..." onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonButton onClick={searchUsers}>Search</IonButton>
            </IonCol>
          </IonRow>
          <IonList>
            {items.map(item => (
              //<IonItem routerLink={`profile/${item.username}`}></IonItem>
              <IonItem routerLink={'profile/username'}>
                <IonAvatar slot="start">
                  <img src="../../resources/appIcon.png" />
                </IonAvatar>
                <IonLabel>
                  <h1 className= "title" >{item.username}</h1>
                  <h3>Name: {item.fullName}</h3>
                  <h3>Email: {item.email}</h3>
                  <IonNote>Gender: {item.gender}</IonNote>
                  <p>Country: {item.country}</p>
                  <p>Language: {item.language}</p>
                  <p>Date: {item.date}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>

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

export default Tab2;
