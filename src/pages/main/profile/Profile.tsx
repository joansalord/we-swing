import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonLoading, IonPage, IonRow, IonTabBar, IonTabButton, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { calendar, ellipse, person, search, star } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../../firebaseConfig';
import './Profile.css';

const Profile: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)
  const [error, setError] = useState(null);

  const [items, setItems] = useState<{
    fullName: string;
    email: string;
    gender: string;
    country: string;
    language: string;
    description: string;
    date: string;
  }>();

  const history = useHistory()
  const [busy, setBusy] = useState(false)
  async function logout() {
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/')
  }

  function edit() {
    history.replace('/editProfile')
  }

  useEffect(() => {
    fetch(`http://localhost:40500/process/profile/${username}`)
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
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="primary">
            <IonLoading isOpen={busy} />
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={star} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        
      </IonHeader>
      <IonContent fullscreen>

        {/*<div className='mainDiv'>
          <IonRow>
            <IonCol size='5'>
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
            </IonCol>
            <IonCol size='6'>
              <h2 className='profileTitle'>{username}</h2>
            </IonCol>
          </IonRow>
          <IonRow className='center'>
            <IonCol size='4' offset='1'>
              <p>0</p>
              <p>Seguidores</p>
            </IonCol>
            <IonCol size='4' offset='2'>
              <p>0</p>
              <p>Seguidos</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonButton expand="block" fill="outline">Edit</IonButton>
            </IonCol>
          </IonRow>
  </div>*/}
        <div className='mainDiv'>
          <IonRow>
            <IonCol size='4'>
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
            </IonCol>
            <IonCol size='4' className='ion-text-center'>
              <p>0</p>
              <p>Seguidores</p>
            </IonCol>
            <IonCol size='4' className='ion-text-center'>
              <p>0</p>
              <p>Seguidos</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <h2 className='profileTitle'>{username}</h2>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" fill="outline" onClick={edit}>Edit profile</IonButton>
            </IonCol>
          </IonRow>
        </div>
        <div className='mainDiv profileProperties'>
          <IonRow>
            <IonCol size='8'>
              <IonLabel class='profileLabel'>Full name</IonLabel>
              <p>{items?.fullName}</p>
              {/*<p>Joan Salord Ribó</p>*/}
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Birth date</IonLabel>
              <p>{items?.date}</p>
              {/*<p>21/08/2000</p>*/}
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
              <IonLabel class='profileLabel'>Email</IonLabel>
              <p>{items?.email}</p>
              {/*<p>a21joasalrib@inspedralbes.cat</p>*/}
            </IonCol>
          </IonRow>
          <IonRow> 
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Gender</IonLabel>
              <p>{items?.gender}</p>
              {/*<p>Please</p>*/}
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Country</IonLabel>
              <p>{items?.country}</p>
              {/*<p>Spain</p>*/}
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Language</IonLabel>
              <p>{items?.language}</p>
              {/*<p>Spanish</p>*/}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Description</IonLabel>
              <IonTextarea >
              <p>{items?.description}</p>
{/*                <p className='descriptionText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie sem nec nibh congue gravida. Curabitur quis tincidunt lacus. Proin convallis at dolor non malesuada. Maecenas bibendum nulla sit amet diam sagittis sollicitudin. Integer pulvinar lobortis neque, ut venenatis risus tempus id. Aliquam tristique commodo rutrum. Vestibulum volutpat vehicula arcu, vel gravida sapien sodales eget. Aenean ac cursus purus. Ut vitae quam eu mi iaculis bibendum eu ac arcu.</p>
*/}              </IonTextarea>
            </IonCol>
          </IonRow>
        </div>

      </IonContent>

      { /* TABS BAR */ }
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

export default Profile;
