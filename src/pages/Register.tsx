import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonLoading, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, ellipse, person } from "ionicons/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../firebaseConfig";
import { setUserState } from "../redux/actions";

const Register: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const dispatch = useDispatch()

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

    async function register() {
      setBusy(true)
      //validation
      if (password !== cpassword) {
        setBusy(false)
        return present('Passwords do not match')
      }

      if (username.trim() === '' || password.trim() === '') {
        return present('Username and password are required')
      }

      const res = await registerUser(username, password)

      if (res) {
        present('You have registered successfully!', 2000)
        login()
      } else {
        present('Error', 2000)
      }
      setBusy(false)
    }

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        {busy && <IonLoading message="Registration in progress.." duration={0} isOpen={busy} animated={true}/>}
        <IonContent fullscreen>
          <IonInput placeholder="Username" onIonChange={(e : any) => setUsername(e.target.value)}/>
          <IonInput placeholder="Password" type="password" onIonChange={(e : any) => setPassword(e.target.value)}/>
          <IonInput placeholder="Confirm password" type="password" onIonChange={(e : any) => setCPassword(e.target.value)}/>
          <IonButton onClick={register}>Register</IonButton>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </IonContent>
      </IonPage>
    );
};
  
export default Register;