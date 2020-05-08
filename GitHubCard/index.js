/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const entryPoint = document.querySelector('.cards');
axios.get('https://api.github.com/users/ferror18')
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/
/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
.then(response => {
  let mydata = response.data;
  entryPoint.appendChild(githubCardMaker(mydata));
  // console.log(mydata);
  
  
})
.catch(response => {
  console.log(response);
  
})
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [`tetondan`,`dustinmyers`,`justsml`,`luishrd`,`bigknell`];
followersArray.forEach(element => {
  axios.get(`https://api.github.com/users/${element}`)
  .then(response => {
    console.log(`Making a card out of user: ${response.data.login}`);
    entryPoint.appendChild(githubCardMaker(response.data));
    console.log(`${response.data.login}'s card is done.`);
    
    
  })
  .catch(response => {
    console.log(response);
    
  })
})
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function githubCardMaker(githubUserObj) {
  //variables
  const {name, followers, following, login, avatar_url, html_url, bio, location} = githubUserObj;
  let card = document.createElement('div');
  let cardInfo = document.createElement('div');
  let userImg = document.createElement('img');
  let h3 = document.createElement('h3');
  let username = document.createElement('p');
  let mylocation = document.createElement('p');
  let profile = document.createElement('p');
  let linktopro = document.createElement('a');
  let followersCount = document.createElement('p');
  let followingCount = document.createElement('p');
  let mybio = document.createElement('p');
  //nesting
  profile.appendChild(linktopro);
  card.appendChild(userImg);
  let arr = [h3, username, mylocation, profile, followersCount, followingCount, mybio];
  arr.forEach(element => {cardInfo.appendChild(element)});
  card.appendChild(cardInfo);
  profile.appendChild(linktopro);
  //clases
  card.classList.add('card');
  cardInfo.classList.add('cardInfo');
  username.classList.add('username');
  mylocation.classList.add('location');
  profile.classList.add('profile');
  linktopro.classList.add('linktopro');
  followersCount.classList.add('followers');
  followingCount.classList.add('following');
  mybio.classList.add('bio');
  userImg.classList.add('userImg');
  h3.classList.add('name');
  //content
  h3.textContent = name;
  username.textContent = login;
  mylocation.textContent = `Location: ${location}`;
  linktopro.href = html_url;
  followersCount.textContent = `Followers: ${followers}`;
  followingCount.textContent = `Following: ${following}`;
  mybio.textContent = `Bio: ${bio}`;
  userImg.src = avatar_url;
  profile.innerHTML = `Profile: <a href=${linktopro}>${linktopro}</a>`;
  //Event Listeners
  //return html element
  return  card;
}
/*
  List of LS Instructors Github username's:
    tetondan,
    dustinmyers,
    justsml,
    luishrd,
    bigknell
*/
