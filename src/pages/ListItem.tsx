import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
//import './Profile.css';
interface ListItemPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}
  
const ListItem: React.FC<ListItemPageProps> = ({match}) => {
  /* 'match' contains information about the route, such as the parameters.
  In this case, with 'match.params.id' we can acces the id that was given
  with the routing system -> <Route path="/listItem/:id" component={ListItem} /> */
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ListItem {match.params.id}</IonTitle>
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
