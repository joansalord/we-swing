import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { backspace, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
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
  
  const history = useHistory()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dismissLoading, setDismissLoading] = useState(false)
  const [items, setItems] = useState<{
    title: string;
    link: string;
    country: string;
    date: string
  }[]>([]);
  
  useEffect(() => {
    fetch(`http://localhost:8080/process/item/${match.params.id}`)
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

  async function cancelAdd() {
    setDismissLoading(true)
    await sleep(1000)
    history.replace('/events')
    setDismissLoading(false)
}

  function addEvent() {

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonLoading isOpen={dismissLoading} duration={2000} message={"Dismissing changes"}/>
            <IonButton onClick={cancelAdd}>
                <IonIcon slot="icon-only" icon={backspace} />
            </IonButton>
        </IonButtons>
          <IonTitle>ListItem {match.params.id}</IonTitle>
          <IonButtons slot="primary">
          <IonLoading isOpen={busy} />
            <IonButton onClick={addEvent}>
              <IonIcon slot="icon-only" icon={save} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">TabProfile</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default ListItem;
