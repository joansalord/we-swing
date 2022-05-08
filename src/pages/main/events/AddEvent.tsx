import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonPopover, IonRow, IonTabBar, IonTabButton, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { backspace, calendar, ellipse, person, save, search, star } from 'ionicons/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../../firebaseConfig';
import { format, parseISO } from 'date-fns'

const AddEvent: React.FC = () => {
  const username = useSelector((state: any) => state.user.username)

  const history = useHistory()
  const [busy, setBusy] = useState(false)
  const [dismissLoading, setDismissLoading] = useState(false)

  const [title, setTitle] = useState<string>()
  const [website, setWebsite] = useState<string>()
  const [country, setCountry] = useState<string>()
  const [town, setTown] = useState<string>()
  const [date, setDate] = useState<string>()
  const [styles, setStyles] = useState<string>()
  const [description, setDescription] = useState<string>()


  async function submitChanges() {
      setBusy(true)
      console.log(title, website, country, town, date, styles, description, username)

      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          title: title,
          website: website,
          country: country,
          town: town,
          date: date,
          styles: styles,
          description: description,
          organizer: username
      })
      }

      fetch(`http://localhost:8080/process/addEvent`, requestOptions)
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
      /*Call to server endpoint with all the inputs 
      and make SQL query*/
      //await( RESPONSE FROM SERVER )
      setBusy(false)
      //redirect to selected event
      //history.replace('/events')
  }

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds)).catch(e => console.error(e))
}

  async function cancelEdit() {
      setDismissLoading(true)
      await sleep(1000)
      history.replace('/events')
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
          <IonTitle>Add Event</IonTitle>
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
        <div className='mainDiv profileProperties'>
          <IonRow>
            <IonCol size='8'>
              <IonLabel class='profileLabel'>Event title</IonLabel>
              <IonInput value={title} placeholder="Enter event title" onIonChange={e => setTitle(e.detail.value!)}></IonInput>
            </IonCol>
            
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Date</IonLabel>
              <IonInput value={date} id="date" placeholder='Enter date'/>
              <IonPopover trigger='date' size='auto'>
                  <IonDatetime presentation='date' locale="en-EN" onIonChange={e => setDate(formatDate(e.detail.value!))}/>
              </IonPopover>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
              <IonLabel class='profileLabel'>Website</IonLabel>
              <IonInput value={website} placeholder="Enter website" onIonChange={e => setWebsite(e.detail.value!)}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow> 
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Country</IonLabel>
              <IonInput value={country} placeholder="Enter country" onIonChange={e => setCountry(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Town</IonLabel>
              <IonInput value={town} placeholder="Enter Input" onIonChange={e => setTown(e.detail.value!)}></IonInput>
            </IonCol>
            
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Styles</IonLabel>
              <IonInput value={styles} placeholder="Enter styles" onIonChange={e => setStyles(e.detail.value!)}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Description</IonLabel>
              <IonTextarea value={description} placeholder="Enter description" onIonChange={e => setDescription(e.detail.value!)} />
            </IonCol>
          </IonRow>
        </div>

      </IonContent>

    </IonPage>
  );
};

export default AddEvent;
