var numSteps = 50;

var premierePage = document.querySelector("#premierePage")
var header = document.querySelector("header")

function buildThresholdList() {
    var thresholds = [];
  
    for (var i=1.0; i<=numSteps; i++) {
      var ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }

const optionsA = {
    threshold:  buildThresholdList()
}

const observerStickyNavbar = new IntersectionObserver(
    // callback :
    function(entries, observer){
        entries.forEach(entry => {
            // if entry.intersectionRatio
            // entry.target.classList.add("sticky")
            if (entry.intersectionRatio < 0.05){
                header.classList.add("premierePage")
            } else {
                header.classList.remove("premierePage")
            }
            // console.log(entry.intersectionRatio)
        });
    }, optionsA);

observerStickyNavbar.observe(premierePage)