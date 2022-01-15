$(document).ready(function(){
    // Call the event handler on #text
    $("#lycee").hover(function(){

      //Event one mouse enter add class
      $("#BJ").addClass("hoverstate");
      $("#lycee").addClass("hoverstate");
      $("#canada").removeClass("active");
      $("#france").removeClass("inactive")

      $("#carteInteractive").addClass("dansFormation");
      $("#carteInteractive").removeClass("dansProfessionnel");
      
    },
      // Event two mouse out remove class               
      function(){
      $("#BJ").removeClass("hoverstate");
      $("#lycee").removeClass("hoverstate");
    });
});


$(document).ready(function(){
    // Call the event handler 
    $("#emse").hover(function(){

      //Event one mouse enter add class
      $("#StEtienne").addClass("hoverstate");
      $("#emse").addClass("hoverstate");
      $("#canada").removeClass("active");
      $("#france").removeClass("inactive")

      $("#carteInteractive").addClass("dansFormation");
      $("#carteInteractive").removeClass("dansProfessionnel");

    },
      // Event two mouse out remove class               
      function(){
      $("#StEtienne").removeClass("hoverstate");
      $("#emse").removeClass("hoverstate");
    });
});

$(document).ready(function(){
    // Call the event handler 
    $("#prepa").hover(function(){

      //Event one mouse enter add class
      $("#Voiron").addClass("hoverstate");
      $("#prepa").addClass("hoverstate");
      $("#canada").removeClass("active");
      $("#france").removeClass("inactive");

      $("#carteInteractive").addClass("dansFormation");
      $("#carteInteractive").removeClass("dansProfessionnel");

    },
      // Event two mouse out remove class               
      function(){
      $("#Voiron").removeClass("hoverstate");
      $("#prepa").removeClass("hoverstate");

    });
});

$(document).ready(function(){
  // Call the event handler 
  $("#poly").hover(function(){

    //Event one mouse enter add class
    $("#Mtl").addClass("hoverstate");
    $("#poly").addClass("hoverstate");
    $("#canada").addClass("active");
    $("#france").addClass("inactive")

    $("#carteInteractive").addClass("dansFormation");
    $("#carteInteractive").removeClass("dansProfessionnel");

  },
    // Event two mouse out remove class               
    function(){
    $("#Mtl").removeClass("hoverstate");
    $("#poly").removeClass("hoverstate");

  });
});

$(document).ready(function(){
  // Call the event handler 
  $("#poly").hover(function(){

    //Event one mouse enter add class
    $("#Mtl").addClass("hoverstate");
    $("#poly").addClass("hoverstate");
    $("#canada").addClass("active");
    $("#france").addClass("inactive")

    $("#carteInteractive").addClass("dansFormation");
    $("#carteInteractive").removeClass("dansProfessionnel");

  },
    // Event two mouse out remove class               
    function(){
    $("#Mtl").removeClass("hoverstate");
    $("#poly").removeClass("hoverstate");

  });
});

$(document).ready(function(){
  // Call the event handler 
  $("#CET").hover(function(){
    //Event one mouse enter add class
    $("#carteInteractive").addClass("dansProfessionnel");
    $("#carteInteractive").removeClass("dansFormation");

  
  },
    // Event two mouse out remove class               
    function(){
    // $("#carteInteractive").removeClass("dansFormation");

  });
});