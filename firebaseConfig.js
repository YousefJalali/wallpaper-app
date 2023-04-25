import { initializeApp } from 'firebase/app'
import Constants from 'expo-constants'
import { getStorage } from 'firebase/storage'

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  databaseURL: Constants.expoConfig.extra.databaseURL,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
