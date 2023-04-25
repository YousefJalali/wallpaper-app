import axios from 'axios'
import { LOAD_WALLPAPERS } from './actionTypes'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebaseConfig'

export const fetchWallpapers = () => {
  return (dispatch) => {
    const imageNames = [
      'img1.jpeg',
      'img12.jpeg',
      'img14.jpeg',
      'img15.jpeg',
      'img22.jpeg',
      'img28.jpeg',
      'img32.jpeg',
      'img34.jpeg',
      'img35.jpeg',
      'img37.jpeg',
      'img38.jpeg',
      'img39.jpeg',
      'img41.jpg',
      'img43.jpg',
      'img44.jpg',
      'img7.jpeg',
      'img9.jpeg',
    ]
    const promises = imageNames.map((imageName) => {
      return getDownloadURL(
        ref(storage, `gs://skull-background.appspot.com/${imageName}`)
      )
    })

    return Promise.all(promises)
      .then((urls) => {
        const data = urls.map((url) => ({
          id: url.replace('.jpeg', ''),
          url,
        }))
        return dispatch(loadWallpapers([...data].reverse()))
      })
      .catch((error) => {
        console.log('Error fetching image URLs:', error)
      })

    // getDownloadURL(storageRef)
    getDownloadURL(ref(storage, 'gs://skull-background.appspot.com/img1.jpeg'))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url)
        let wallpapers = []
        wallpapers.push(url)
        return dispatch(loadWallpapers(wallpapers.reverse()))
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = (event) => {
          const blob = xhr.response
        }
        xhr.open('GET', url)
        xhr.send()

        // Or inserted into an <img> element
        const img = document.getElementById('myimg')
        img.setAttribute('src', url)
      })
      .catch((error) => {
        console.log(error)
        return alert('Failed to fetch wallpapers. Try again.')
      })
    // axios
    //   .get('https://skull-background.firebaseio.com/wallpapers.json')
    //   .then((res) => {
    //     const data = res.data
    //     let wallpapers = []
    //     for (let obj in data) {
    //       wallpapers.push(data[obj])
    //     }
    //     return dispatch(loadWallpapers(wallpapers.reverse()))
    //   })
    //   .catch(() => alert('Failed to fetch wallpapers. Try again.'))
  }
}

export const loadWallpapers = (wallpapers) => {
  return {
    type: LOAD_WALLPAPERS,
    wallpapers,
  }
}
