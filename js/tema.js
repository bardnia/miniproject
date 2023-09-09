const $temaget = document.querySelector('.tema');
const $romance = document.querySelector('.romance');

const pagetema = window.localStorage.getItem('tema');

pagetema.onclick = function() { window.localStorage.setItem('tema','웹툰')}
$romance.onclick = function() { window.localStorage.setItem('tema','웹툰')}