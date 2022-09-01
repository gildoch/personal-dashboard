/*fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  .then(res => res.json())
  .then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById('author').textContent = `By: ${data.user.name}`
  }).catch(err => {
    console.log(err)
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1489619243109-4e0ea59cfe10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjE5MjYxMDI&ixlib=rb-1.2.1&q=80&w=1080)`
  })*/


fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then(res => {
    if (!res.ok) {
      throw Error("Something went wrong")
    }
    return res.json()
  })
  .then(data => {
    document.getElementById('crypto-top-wrapper').innerHTML = `
      <img src="${data.image.small}" class="crypto-image" />
      <p class="crypto-name">${data.name}</p>
    `;
    document.getElementById('crypto-info').innerHTML += `
             <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>🔺: $${data.market_data.high_24h.usd}</p>
            <p>🔻: $${data.market_data.low_24h.usd}</p>
        `
  })
  .catch(err => console.error(err))


setInterval(() => {
    var date = new Date()
    var current_time = date.toLocaleString("en-us", { timeStyle: "short" })
    document.getElementById('time').textContent = current_time
}, 1000)


navigator.geolocation.getCurrentPosition(position =>{
  //console.log(position.coords.latitude, position.coords.longitude)
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    .then(res => {
      if(!res.ok){
        throw Error("Weather mot available")
      }
      return res.json();
    })
    .then(data => {
      console.log(data)
      document.getElementById('weather').innerHTML += `
      <p class="temp">${Math.round(data.main.feels_like)}ºC</p>
      <p>${data.name}</p>
      <div class="bottom-wrapper">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"/>
        <div class="minmax-temp">
        <p>${Math.round(data.main.temp_max)}º/${Math.round(data.main.temp_min)}º</p>
        <p>Precipitation: 100%</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        </div>
      </div>
      
      `
    }).catch(err => console.log(err))
});

