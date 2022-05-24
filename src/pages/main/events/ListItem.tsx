import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { backspace, save } from 'ionicons/icons';
import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
//import './Profile.css';
interface ListItemPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
  
const ListItem: React.FC<ListItemPageProps> = ({match}) => {
  /* 'match' contains information about the route, such as the parameters.
  In this case, with 'match.params.id' we can acces the id that was given
  with the routing system -> <Route path="/listItem/:id" component={ListItem} /> */
  const username = useSelector((state: any) => state.user.username)
  const history = useHistory()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dismissLoading, setDismissLoading] = useState(false)
  const [id, setId] = useState<string>();
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

  const [totalAtendees, setTotalAtendees] = useState<{
    number: string;
  }[]>([]);

  function rechargeAtendees() {
    fetch(`http://localhost:40500/process/totalAtendees/${match.params.id}`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setTotalAtendees(result);
        console.log(totalAtendees);
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
  }
  
  useEffect(() => {
    rechargeAtendees();
    fetch(`http://localhost:40500/process/item/${match.params.id}`)
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

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds)).catch(e => console.error(e))
}

  async function backToEvents() {
    setDismissLoading(true)
    await sleep(1000)
    history.replace('/events')
    setDismissLoading(false)
}

  function attend() {
    console.log('I will attend.')

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        username: username,
        id: match.params.id
    })
    
    }

    /*Missing check if user already attends the event,
    in which case the button would be different and would
    say "I will not attend".
    Given that second option, fetch a delete call to erase
    the assistance from the attend table
    */

    fetch(`http://localhost:40500/process/attend`, requestOptions)
    .then(res => res.json())
    .then(
      async (result) => {
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )

    
    
  }

  return (
    <IonPage>
      {items.map(item => (
        <>
          <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
              <IonButton onClick={backToEvents}>
                  <IonIcon slot="icon-only" icon={backspace} />
              </IonButton>
          </IonButtons>
            <IonTitle>ListItem {match.params.id}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <div className='mainDiv'>
            <IonRow>
              <IonCol className='ion-text-center'>
                <h2 className='profileTitle'>{item.title}</h2>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol size='4' className='ion-text-center'>
                <p>{totalAtendees}</p>
                <p>Attendees</p>
              </IonCol>
              <IonCol>
                <IonButton expand="block" fill="outline" onClick={attend}>I will attend</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='6'>
                <IonLabel class='profileLabel'>Country</IonLabel>
                <p>{item.country}</p>
              </IonCol>
              <IonCol size='6'>
                <IonLabel class='profileLabel'>Town</IonLabel>
                <p>{item.town}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel class='profileLabel'>Date</IonLabel>
                <p>{item.date}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel class='profileLabel'>Styles</IonLabel>
                <p>{item.styles}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel class='profileLabel'>Description</IonLabel>
                <p>{item.description}</p>
              </IonCol>

            </IonRow>
          </div>
        </IonContent>
      </>
      ))}
      
    </IonPage>
  );
};

export default ListItem;
