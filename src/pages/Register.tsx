import { IonApp, IonButton, IonCol, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonLabel, IonLoading, IonPage, IonPopover, IonRow, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { format, parseISO } from "date-fns";
import { calendar, ellipse, person } from "ionicons/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../firebaseConfig";
import { setUserState } from "../redux/actions";
import './Register.css';

const Register: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [fullName, setFullName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [gender, setGender] = useState<string>()
    const [country, setCountry] = useState<string>()
    const [language, setLanguage] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [date, setDate] = useState<string>()
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
        setBusy(false)
        return present('Username and password are required', 2000)
      }

      const res = await registerUser(username, password)

      if (res) {
        present('You have registered successfully!', 2000)

        //SQL INSERT
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
            language: language
        })
        }
        fetch(`http://localhost:40500/process/insertUser`, requestOptions)
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

        login()
      } else {
        present('Error', 2000)
      }
      setBusy(false)
    }

    const formatDate = (value: string) => {
      return format(parseISO(value), 'MMM dd yyyy');
    };

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        {busy && <IonLoading message="Registration in progress.." duration={0} isOpen={busy} animated={true}/>}
        <IonContent fullscreen>
        <div className='mainDiv profileProperties'>
          <IonRow>
            <IonCol>
            <IonLabel class='profileLabel'>Username</IonLabel>
              <IonInput placeholder="Username" onIonChange={(e : any) => setUsername(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonLabel class='profileLabel'>Password</IonLabel>
              <IonInput placeholder="Password" type="password" onIonChange={(e : any) => setPassword(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonLabel class='profileLabel'>Confirm password</IonLabel>
              <IonInput placeholder="Confirm password" type="password" onIonChange={(e : any) => setCPassword(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='8'>
              <IonLabel class='profileLabel'>Full name</IonLabel>
              <IonInput value={fullName} placeholder="Enter full name" onIonChange={e => setFullName(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Birth date</IonLabel>
              <IonInput value={date} id="date" placeholder='date'/>
              <IonPopover trigger='date' size='auto'>
                  <IonDatetime presentation='date' locale="en-EN" onIonChange={e => setDate(formatDate(e.detail.value!))}/>
              </IonPopover>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel class='profileLabel'>Email</IonLabel>
              <IonInput value={email} placeholder="Enter email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow> 
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Gender</IonLabel>
              <IonInput value={gender} placeholder="Enter gender" onIonChange={e => setGender(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Country</IonLabel>
              <IonInput value={country} placeholder="Enter country" onIonChange={e => setCountry(e.detail.value!)}></IonInput>
            </IonCol>
            <IonCol size='4'>
              <IonLabel class='profileLabel'>Language</IonLabel>
              <IonInput value={language} placeholder="Enter language" onIonChange={e => setLanguage(e.detail.value!)}></IonInput>
            </IonCol>
          </IonRow>
        </div>
        <div className="ion-text-center">
          <IonButton onClick={register}>Register</IonButton>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
          
        </IonContent>
      </IonPage>
    );
};
  
export default Register;