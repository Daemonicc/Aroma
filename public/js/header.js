var  navList = document.querySelectorAll('.nav-list');
for (var i = 0; i<navList.length; i++){

navList[i].addEventListener('click', function(){
    navList[0].classList.remove('active')
    navList[1].classList.remove('active')
    navList[2].classList.remove('active')
    navList[3].classList.remove('active')
    navList[4].classList.remove('active')
    navList[5].classList.remove('active')
    this.classList.add('active')

})
}
