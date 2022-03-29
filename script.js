const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".container .seat");
const notOccupiedSeats = document.querySelector(".container .seat:not(.occupied)");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const movieSelectBox = document.getElementById("movie");
const reset =document.querySelector('.reset');

reset.addEventListener("click",()=>{
    localStorage.clear();
    window.location.reload();
});
    
// öcne localstorage sonra selectbox

//en güncel movieTikcetPrice
let currentTicketPrice = localStorage.getItem("selectedMoviePrice") ? localStorage.getItem("selectedMoviePrice"):movieSelectBox.value;

//en güncel movieIndex
let currentMovieIndex = localStorage.getItem("selectedMovieIndex") ? localStorage.getItem("selectedMovieIndex") : movieSelectBox.selectedIndex;

// secilen koltukların indexlerini tutmam gerekiyor .
// seçilen movie'nin index'ni tutmam gerekiyor .

window.addEventListener("load", (e) => {
    movieSelectBox.selectedIndex = currentMovieIndex;
    displaySeats();
    updateMovieInfo();
    

})



//aşağıdaki kod bloğu  select elementinden film seçmek için yazıldı.
movieSelectBox.addEventListener("change", (e) => {
    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;  //select elementleri için kullanılıyor .
    setMovieDataToLocalStorage(ticketPrice,movieIndex);
    updateMovieInfo();
});


//local storage' e gönderilmesini sağladım.
const setMovieDataToLocalStorage = (ticketPrice,movieIndex)=> {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", ticketPrice);
}

container.addEventListener("click",(e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");  //classList.toggle ile class adını ekleyip çıkarabiliyoruz .
        
    }
    updateMovieInfo();
})

const updateMovieInfo = () =>{
    let selectedSeats = document.querySelectorAll(".row .seat.selected"); 
    let selectedSeatsIndexArray = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));  //seçilen koltukları bir array içerisine attık.

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndexArray));

    count.innerText = selectedSeatsIndexArray.length;
    total.innerText = selectedSeatsIndexArray.length * movieSelectBox.value;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];

}

const displaySeats = () => {
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length> 0) {
        allSeats.forEach((seat,index) => {
            if(selectedSeatsFromStorage.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }
}

