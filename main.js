const addPlayer = document.getElementById('player-data'),
firstName = document.getElementById('first-name'),
lastName = document.getElementById('last-name'),
country = document.getElementById('country'),
score = document.getElementById('score'),
error = document.querySelector('.error'),
players = document.getElementById('players');

addPlayer.addEventListener('submit', e => {
      e.preventDefault();

      if(firstName.value === '' || lastName.value === '' || country.value === '' || score.value === ''){
            error.textContent = 'All Fields are required'
      }else{
            newPlayer({
                  firstname: firstName.value.toUpperCase(),
                  lastname:  lastName.value.toUpperCase(),
                  country:   country.value.toUpperCase(),
                  score:     parseFloat(score.value)
            })
            addNewPlayer({
                  firstname: firstName.value.toUpperCase(),
                  lastName:  lastName.value.toUpperCase(),
                  country:   country.value.toUpperCase(),
                  score:     parseFloat(score.value)
            })
            firstName.value = '';
            lastName.value = '';
            country.value = '';
            score.value = '';

            if(error){
                  error.textContent = '';
            }
      }
});

function newPlayer ({firstname, lastname, country, score}){
      let player = document.createElement('li');
      player.className = 'player';

      let playerInfo = document.createElement('div');
      playerInfo.className = 'player-info';

      let playerName = document.createElement('div');
      playerName.className = 'player-name';

      let firstName = document.createElement('p');
      firstName.className = 'first-name';
      firstName.textContent = firstname;

      let lastName = document.createElement('p');
      lastName.className = 'last-name';
      lastName.textContent = lastname;

      playerName.appendChild(firstName)
      playerName.appendChild(lastName)

      let timeCreated = document.createElement('p');
      timeCreated.className = 'time-created';
      timeCreated.textContent = getTime();

      playerInfo.appendChild(playerName);
      playerInfo.appendChild(timeCreated);

      let playerNation = document.createElement('p');
      playerNation.className = 'player-nation';
      playerNation.textContent = country;

      let playerScore = document.createElement('p');
      playerScore.className = 'player-score';
      playerScore.textContent = score;

      let buttons = document.createElement('div');
      buttons.className = 'buttons';

      let deleteButton = document.createElement('button');
      deleteButton.className = 'button';

      let deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-trash-can');
      deleteIcon.classList.add('fas');

      deleteButton.appendChild(deleteIcon);

      let plusFive = document.createElement('button')
      plusFive.className = 'button';
      plusFive.textContent = '+5';

      let minusFive = document.createElement('button')
      minusFive.className = 'button';
      minusFive.textContent = '-5';

      buttons.appendChild(deleteButton);
      buttons.appendChild(plusFive);
      buttons.appendChild(minusFive);

      player.appendChild(playerInfo);
      player.appendChild(playerNation);
      player.appendChild(playerScore);
      player.appendChild(buttons);

      players.appendChild(player);

      deleteButton.addEventListener('click', e => {
            players.removeChild(deleteButton.parentElement.parentElement)
            window.localStorage.removeItem('players')
      });

      plusFive.addEventListener('click', e => {
            score += 5
            playerScore.textContent = score;
      });

      minusFive.addEventListener('click', e => {
            score -= 5
            playerScore.textContent = score;
      });
}

function getTime(){
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      date = new Date(),
      month = months[date.getMonth()].slice(0, 3).toUpperCase(),
      year = date.getFullYear(),
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      timeOfDay = 'PM';

      if(day < 10) day = '0' + day;
      if(minute < 10) minute = '0' + minute;
      if(hour < 10) hour = '0' + hour;
      if(hour < 12) timeOfDay = 'AM'

      return `${month} ${day}, ${year} ${hour}:${minute} ${timeOfDay}`
}

function addNewPlayer({firstname, lastname, country, score}){
      let playerList = window.localStorage.getItem('players');
      playerList = playerList ? JSON.parse(playerList) : [];
      playerList.push({firstname, lastname, country, score});
      window.localStorage.setItem('players', JSON.stringify(playerList))
}

let playerList = localStorage.getItem('players');
if(playerList){
    JSON.parse(playerList).forEach(player => {
        newPlayer({
            firstname: player.firstName,
            lastname:  player.lastname,
            country: player.country,
            score: player.score
      });
    });
}

