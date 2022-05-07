import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonLoading, IonPage, IonRow, IonTabBar, IonTabButton, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { calendar, ellipse, person, search, star } from 'ionicons/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../firebaseConfig';
import './Profile.css';

const Profile: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)

  const history = useHistory()
  const [busy, setBusy] = useState(false)
  async function logout() {
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/')
  }

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
              <h2 className='profileTitle'>{username}</h2>
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
          <IonRow className='ion-text-center'>
            
          </IonRow>
          <IonRow>
            <IonCol>
            <IonButton expand="block" fill="outline">Edit</IonButton>
            </IonCol>
          </IonRow>
        </div>
        <div className='mainDiv profileProperties'>
          <IonRow>
            <IonCol size='8'>
              <IonLabel class='profileLabel'>Full name</IonLabel>
              <p>Joan Salord Ribó</p>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Birth date</IonLabel>
              <p>21/08/2000</p>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
              <IonLabel class='profileLabel'>Email</IonLabel>
              <p>a21joasalrib@inspedralbes.cat</p>
            </IonCol>
          </IonRow>
          <IonRow> 
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Sex</IonLabel>
              <p>Please</p>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Country</IonLabel>
              <p>Spain</p>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Language</IonLabel>
              <p>Spanish</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Description</IonLabel>
              <IonTextarea >
                <p className='descriptionText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie sem nec nibh congue gravida. Curabitur quis tincidunt lacus. Proin convallis at dolor non malesuada. Maecenas bibendum nulla sit amet diam sagittis sollicitudin. Integer pulvinar lobortis neque, ut venenatis risus tempus id. Aliquam tristique commodo rutrum. Vestibulum volutpat vehicula arcu, vel gravida sapien sodales eget. Aenean ac cursus purus. Ut vitae quam eu mi iaculis bibendum eu ac arcu.</p>
              </IonTextarea>
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
