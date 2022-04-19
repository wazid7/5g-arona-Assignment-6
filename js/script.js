const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);

  searchField.value = '';
  if(searchText == ''){
    alert('❌ Please write someting to display 🌻');
  }
  else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
  }
};

const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  // console.log(phones);
  searchResult.textContent = ''; // clear previous result
  if( phones.length == 0 ){
    alert('💔 No Result Found!!!');
  };
  for (const phone of phones.slice(0,20)) {
    // console.log(phone);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card py-3 shadow-sm">
                <img src="${phone.image}" class="w-50 card-img-top img-fluid mx-auto pt-2" alt="...">
                <div class="card-body">
                  <h5 class="card-title fw-bold">${phone.brand}</h5>
                  <p class="card-text">${phone.phone_name}</p>
                  <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-outline-dark">More Details</button>
                </div>
              </div>
    `;
    searchResult.appendChild(div);
  }
};
const loadPhoneDetail = (phoneId) => {
  // console.log(phoneId);
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhoneDetail(data.data));
};
const displayPhoneDetail = phone => {
  // console.log(phone);
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.textContent = ''; // clear previous result

  const div = document.createElement('div');
  div.classList.add('row', 'mb-4');
  div.innerHTML = `
    <div class="col-md-6 d-flex flex-column justify-content-center  text-md-end">
      <img class="img-fluid mb-3 mx-auto w-50" src="${phone.image}" alt="">
    </div>
    <div class="col-md-5  py-5 ">
      <div class="phone-details-div">
      <h3 class="fw-bold mb-3">${phone.brand}</h3>
      <h6 class="fw-bold">Model: <span class="h6">${phone.name}</span></h6>
      <h6 class="fw-bold">Release Date: <span class="h6">${phone?.releaseDate || 'No release date found!!! 😢'}</span></h6>
        <h6 class="fw-bold">Processor: <span class="h6">${phone.mainFeatures.chipSet}</span></h5>
        <h6 class="fw-bold">Display Size: <span class="h6">${phone.mainFeatures.displaySize}</span></h5>
        <h6 class="fw-bold">Storage: <span class="h6">${phone.mainFeatures.memory}</span></h5>
        <h6 class="fw-bold">Sensors: <span class="h6">${phone.mainFeatures?.sensors.join(', ')}</span></h5>
        <h6 class="fw-bold">Bluetooth: <span class="h6">${phone?.others?.Bluetooth || 'No information about Bluetooth 😢'}</span> </h6>
        <h6 class="fw-bold">GPS: <span class="h6">${phone.others?.GPS || 'No information about GPS 😢'}</span> </h6>
        <h6 class="fw-bold">NFC: <span class="h6">${phone.others?.NFC || 'No information about NFC 😢'}</span> </h6>
        <h6 class="fw-bold">Radio: <span class="h6">${phone.others?.Radio || 'No information about Radio 😢'}</span> </h6>
        <h6 class="fw-bold">USB: <span class="h6">${phone.others?.USB || 'No information about USB 😢'}</span> </h6>
        <h6 class="fw-bold">WLAN: <span class="h6">${phone.others?.WLAN || 'No information about WLAN 😢'}</span> </h6>
      </div>
    </div>
  `
  phoneDetails.appendChild(div);
};
 