import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonLoading, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, ellipse, person } from "ionicons/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../firebaseConfig";

const Register: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    const [present, dismiss] = useIonToast();

    function loginUser() {
        console.log(username, password)
    }

    async function register() {
      setBusy(true)
      //validation
      if (password !== cpassword) {
        return present('Passwords do not match')
      }

      if (username.trim() === '' || password.trim() === '') {
        return present('Username and password are required')
      }

      const res = await registerUser(username, password)

      if (res) {
        present('You have registered successfully!')
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