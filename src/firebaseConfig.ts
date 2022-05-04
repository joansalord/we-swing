import { useIonToast } from '@ionic/react';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';




const config = {
    apiKey: "AIzaSyAPGHYLCyMoX0XaFHVQZqsyXZ6BoNTrZRY",
    authDomain: "weswing-96539.firebaseapp.com",
    projectId: "weswing-96539",
    storageBucket: "weswing-96539.appspot.com",
    messagingSenderId: "154907613972",
    appId: "1:154907613972:web:29a97599a590e98abfc001",
    measurementId: "G-ZCZP1R6FBE"
}

firebase.initializeApp(config)

export function getCurrentUser() {
    return new Promise ((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    })
}

export async function loginUser(username: string, password: string) {

    const email = `${username}@weswing.com`

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return false
    }
}

export function logoutUser() {
    return firebase.auth().signOut()
}

export async function registerUser(username: string, password: string) {

    const email = `${username}@weswing.com`

    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(res)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}