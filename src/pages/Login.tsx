import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonLoading, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, ellipse, person } from "ionicons/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../firebaseConfig";
import { setUserState } from "../redux/actions";

const Login: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [present, dismiss] = useIonToast();

    async function login() {
      setBusy(true)
        const res: any = await loginUser(username, password)

        if (!res) {
          present('Error logging with your credentials', 2000)
        } else {
          dispatch(setUserState(res.user.email))
          history.replace('/events')
          present('You logged in!', 2000)
          
        }
        console.log(`${res ? 'Login success' : 'Login failed'}`)
        setBusy(false)
    }

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        {busy && <IonLoading message="Plese wait.." duration={0} isOpen={busy} animated={true}/>}
        <IonContent fullscreen>
          <IonInput placeholder="Username" onIonChange={(e : any) => setUsername(e.target.value)}/>
          <IonInput placeholder="Password" type="password" onIonChange={(e : any) => setPassword(e.target.value)}/>
          <IonButton onClick={login}>Login</IonButton>
          <p>New here? <Link to="/register">Register</Link></p>
        </IonContent>
      </IonPage>
    );
};
  
export default Login;