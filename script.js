const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;
    
    const seatsIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat));
    localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}

//Get data from localstorage and poulate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
    
    if(selectedSeats !== null && selectedSeats.length > 0){

        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })

    }

    //populate the select dropdown
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select dropdown
movieSelect.addEventListener("change", e => {
    
    ticketPrice = +e.target.value;

    //save movie details to the local storage
    localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);

    updateSelectedCount();
})

//seat selection
container.addEventListener("click", e => {
    
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

updateSelectedCount();