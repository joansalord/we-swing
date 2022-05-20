import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonPopover, IonRow, IonTabBar, IonTabButton, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { backspace, calendar, ellipse, person, save, search, star } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../../firebaseConfig';
import './Profile.css';
import { format, parseISO } from 'date-fns'
import { request } from 'http';

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
  const [date, setDate] = useState<string>()

  const [items, setItems] = useState<{
    fullName: string;
    email: string;
    gender: string;
    country: string;
    language: string;
    description: string;
    date: string;
  }>();

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

  async function submitChanges() {
      setBusy(true)
      //console.log(fullName,date, email, gender, country, language, description)
      /*Call to server endpoint with all the inputs 
      and make SQL query*/
      //await( RESPONSE FROM SERVER )
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          username: username,
          fullName: fullName,
          date: date,
          email: email,
          gender: gender,
          country: country,
          language: language,
          description: description
      })
      }

      fetch(`http://localhost:40500/process/saveProfile`, requestOptions)
      //fetch(`http://localhost:8080/process/saveProfile/${fullName}/${date}/${email}/${gender}/${country}/${language}/${description}/${username}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
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

  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

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
              <IonInput value={date} id="date" placeholder='date'/>
              <IonPopover trigger='date' size='auto'>
                  <IonDatetime presentation='date' locale="en-EN" onIonChange={e => setDate(formatDate(e.detail.value!))}/>
              </IonPopover>
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
function setError(error: any) {
  throw new Error('Function not implemented.');
}

