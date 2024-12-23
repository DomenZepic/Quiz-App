
// dinamični prikaz vrednosti sliderja
var slider = document.getElementById("#-of-questions");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
    }