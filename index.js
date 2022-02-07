import * as core from '@actions/core';
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

try {
    var textFileURL = "https://raw.githubusercontent.com/" + owner + "/" + repoName + "/context/" + fileName
    console.log(textFileURL)
  
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig)
    const db = getFirestore()

    const owner = core.getInput('owner')
    console.log(`Hello ${owner}!`)
    const yourName = core.getInput('yourName')
    console.log(`Hello ${yourName}!`)
    const repoName = core.getInput('repoName')
    console.log(`Hello ${repoName}!`)
    const fileName = core.getInput('fileName')
    console.log(`Hello ${fileName}!`)
    //console.log()

    const exerciseWeek = repoName.split("-")[1]
    console.log(exerciseWeek)
    const collectionName = "exercise-" + exerciseWeek
    console.log(collectionName)
    
    const myArray = textFileURL.split("\n")
    let longCommit = myArray[1]
    console.log(longCommit)
    let result = myArray[2]
    console.log(result)

    // Add a new document in collection "cities"
    db.collection(collectionName).doc(yourName).set({
        commit: longCommit,
        result: result,
    })

} catch (error) {
    core.setFailed(error.message);
}