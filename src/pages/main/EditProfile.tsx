import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonLoading, IonPage, IonRow, IonTabBar, IonTabButton, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { backspace, calendar, ellipse, person, save, search, star } from 'ionicons/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../firebaseConfig';
import './Profile.css';

const EditProfile: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)

  const history = useHistory()
  const [busy, setBusy] = useState(false)
  const [dismissLoading, setDismissLoading] = useState(false)

  const [fullName, setFullName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [gender, setGender] = useState<string>()
  const [country, setCountry] = useState<string>()
  const [language, setLanguage] = useState<string>()
  const [description, setDescription] = useState<string>()


  async function submitChanges() {
      setBusy(true)
      console.log(fullName, email, gender, country, language, description)
      /*Call to server endpoint with all the inputs 
      and make SQL query*/
      //await( RESPONSE FROM SERVER )
      setBusy(false)
      history.replace('/profile')
  }

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds)).catch(e => console.error(e))
}

  async function cancelEdit() {
      setDismissLoading(true)
      await sleep(1000)
      history.replace('/profile')
      setDismissLoading(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonLoading isOpen={dismissLoading} duration={2000} message={"Dismissing changes"}/>
            <IonButton onClick={cancelEdit}>
                <IonIcon slot="icon-only" icon={backspace} />
            </IonButton>
        </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
          <IonButtons slot="primary">
          <IonLoading isOpen={busy} />
            <IonButton onClick={submitChanges}>
              <IonIcon slot="icon-only" icon={save} />
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
        </div>
        <div className='mainDiv profileProperties'>
          <IonRow>
            <IonCol size='8'>
              <IonLabel class='profileLabel'>Full name</IonLabel>
              <p>Joan Salord Ribó</p>
              <IonInput value={fullName} placeholder="Enter Input" onIonChange={e => setFullName(e.detail.value!)}></IonInput>
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
              <IonInput value={email} placeholder="Enter Input" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow> 
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Sex</IonLabel>
              <p>Please</p>
              <IonInput value={gender} placeholder="Enter Input" onIonChange={e => setGender(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Country</IonLabel>
              <p>Spain</p>
              <IonInput value={country} placeholder="Enter Input" onIonChange={e => setCountry(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Language</IonLabel>
              <p>Spanish</p>
              <IonInput value={language} placeholder="Enter Input" onIonChange={e => setLanguage(e.detail.value!)}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Description</IonLabel>
              <IonTextarea >
                <p className='descriptionText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie sem nec nibh congue gravida. Curabitur quis tincidunt lacus. Proin convallis at dolor non malesuada. Maecenas bibendum nulla sit amet diam sagittis sollicitudin. Integer pulvinar lobortis neque, ut venenatis risus tempus id. Aliquam tristique commodo rutrum. Vestibulum volutpat vehicula arcu, vel gravida sapien sodales eget. Aenean ac cursus purus. Ut vitae quam eu mi iaculis bibendum eu ac arcu.</p>
                <IonInput value={description} placeholder="Enter Input" onIonChange={e => setDescription(e.detail.value!)}></IonInput>
              </IonTextarea>
            </IonCol>
          </IonRow>
        </div>

      </IonContent>

    </IonPage>
  );
};

export default EditProfile;
