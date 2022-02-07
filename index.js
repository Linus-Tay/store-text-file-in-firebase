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

    let owner = ''
    let yourName = ''
    let repoName = ''
    let fileName = ''

    owner = core.getInput('owner')
    console.log(`Hello ${owner}!`)
    yourName = core.getInput('yourName')
    console.log(`Hello ${yourName}!`)
    repoName = core.getInput('repoName')
    console.log(`Hello ${repoName}!`)
    fileName = core.getInput('fileName')
    console.log(`Hello ${fileName}!`)
    //console.log()

    let exerciseWeek = repoName.split("-")[1]
    console.log(exerciseWeek)
    let collectionName = "exercise-" + exerciseWeek
    console.log(collectionName)
    
    let myArray = textFileURL.split("\n")
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