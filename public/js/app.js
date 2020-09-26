console.log('server side javascript is runnig!')

const weather = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weather.addEventListener('submit' , (e) => {
    e.preventDefault()

    let location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })

    search.value = ''

})