const $temaget = document.querySelector('.tema');
const pagetema = window.localStorage.getItem('tema');

pagetema.onclick = function() { window.localStorage.setItem('tema','웹툰')}