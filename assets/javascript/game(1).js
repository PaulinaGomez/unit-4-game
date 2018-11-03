$(document).ready(function() {

var comInstructions = document.getElementsByClassName("lead")[0];
comInstructions.innerHTML = "<h3>I am COM, ready to play?</h3>";
console.log(comInstructions); //??????????
/*$("comInstructions").toggle(function(){
    $(this).text("I am Com, ready to play?");
    console.log(comInstructions);
  });*/
/*
  $('#element').toggle(function(){
    $(this).on("click",'one');
  },
  function(){
    $(this).removeClass('one').addClass('two');
  },
  function(){
    $(this).removeClass('two').addClass('three');
  });*/

var hp = 0;
var attack = 0;
var counterAttack = 0;
var contador = 0; //<----- numero de clicks
var secondClick = true;
var thirdClick = true;

    function comInstruction () {
    //append text in com "choose your character" primer click asigna personaje al usuario el resto se convierte en enemigos
    //personaje se mueve a primeras 3 col y reduce tamaño append text Usuario
    //enemigos se mueven debajo de row de personajes append text Enemies Available
    $(".btn.btn-primary.btn-lg").on("click", function() {
        if(contador == 0) {
            comInstructions.innerHTML = "<h3>Choose your Character</h3>";
            contador++;
            } 
            
        else if(contador == 1)
            comInstructions.innerHTML = "<h3>Battle to Death, choose an enemy!</h3>";
        
    });
    function start () {
    //append text in com "choose your character" primer click asigna personaje al usuario el resto se convierte en enemigos
    //personaje se mueve a primeras 3 col y reduce tamaño append text Usuario
    //enemigos se mueven debajo de row de personajes append text Enemies Available
    $(".btn.btn-primary.btn-lg").on("click", function() {
        if(contador == 0)
            comInstructions.innerHTML = "<h3>Choose your Character</h3>";
        else if(contador == 1)
            comInstructions.innerHTML = "<h3>Battle to Death, choose an enemy!</h3>";
        
        
    });*/
        /*$("comInstructions").toggle(function(){
        $(comInstructions).empty().text("Choose your Character");
        console.log(comInstructions);
        });*/
        $(".card character").on("click", function() {
            var user = document.createElement("p");
            user.innerHTML = "User Character";           
            $(".col-md-3 first").append(user);  
            $(".col-md-3 first").append(".card character");
        }); 
        secondClick = false;
    }

    
    function fight () {
        //append text in com "Battle to Death, choose an enemy"
        //on click append personaje se mueve a col
        $(".btn.btn-primary.btn-lg").on("click", function() {
        console.log(comInstructions);
        });         
        /*    $("comInstructions").toggle(function(){
                $(comInstructions).empty().text("Battle to Death, choose an enemy");
                console.log(comInstructions);
                });*/
        $(".card character").on("click", function() {
            var oponent = document.createElement("p");
            oponent.innerHTML = "Oponent";           
            $(".col-md-3 first").append(oponent);  
            $(".col-md-3 first").append(".card character");
        }); 
            thirdClick = false;
    }


comInstruction ();
start(secondClick);
fight(thirdClick);



}

/*class character { trying with class <---------------------------------
    constructor(hp, attack) {
      this.hp = hp;
      this.attack = attack;
      this.counteratt = 0;
    }
    comEnemies() {
        $(".card character").on("click", function() {
        var enemy = document.createElement("p");
        enemy.innerHTML = "Available Enemies";           
        $(".col-md-3 Enemy1").append(enemy);  
        $(".col-md-3 Enemy1").append(".card character");
        });
    }

    userCharacter() {
    $(".btn.btn-primary.btn-lg").on("click", function() {
        comInstructions.textContent = "Choose your Character";
        console.log(comInstructions);
        });
    
    $(".card character").on("click", function() {
        var user = document.createElement("p");
        user.innerHTML = "User Character";           
        $(".col-md-3 first").append(user);  
        $(".col-md-3 first").append(".card character");
        });
        conEnemies();
    }
    
    comDefender() {
    $(".btn.btn-primary.btn-lg").on("click", function() {
        comInstructions.textContent = "Battle to Death, choose an enemy";
        console.log(comInstructions);
    });

    $(".card character").on("click", function() {
        var oponent = document.createElement("p");
        oponent.innerHTML = "Oponent";
        $(".col-md-3 third").append(oponent);
        $(".col-md-3 third").append(".card character");
    });
    }
}
var hippolyta = new character("100", "5", "0");
var zeus = new character("180", "25", "0");
var athena = new character("150", "20", "0");
var hades = new character("120", "8", "0");






/*Pseudo code <----------------------------
details:
-establecer clase personajes a cada personaje
-establecer personajes como objetos individuales propiedades
-

variables:
-4 personajes
-puntos de hp 
-puntos de ataque 
-puntos de ataque después de batalla
    *guarda datos de previas batallas en caso de aplicar
-tres tipos de modos dentro de los personajes
            -personaje del usurio
            -enemigos disponibles
            -defender (enemigo activo al cual se tiene que eliminar primero)

Juego
1. mostrar opciones de personaje (4)
2. Iniciar el juego con nota de instrucciones en seccion com (funcion inicio de juego)
    2.1 nota en com " elige tu personaje" primer click asigna personaje al usuario el resto se convierte en enemigos
        2.1.1 personaje permanece en primera seccion 
        2.1.2 el resto de los personajes la img se mueve a segunda seccion 
    2.2 nota en com "elige tu oponente" segundo click de personajes enemigos lo reta a batalla (funcion batle)
        2.2.1 personaje se presenta en modo defender imagen aparece en esta seccion 
        2.2.2 inician ataques el ususario al hacer click en atacar
            2.2.2.1 cada ataque del ususario es respondido instantaneamente por enemigo
                2.2.2.2 aparece nota en com con detalles de "you attacked "nombre del enemigo" for 8 damage = -8 health points"
                    "Nombre del personaje" attacked you back for 25 damage= -25 health points"
            2.2.2.2 cada ataque incrementa poder de ataque de usuario por si mismo 8,16,24
                    mientras que el del enemigo permanece igual
            2.2.2.3 cada ataque resta puntos de hp tanto para usuario como para enemigo al mismo tiempo
                2.2.2.1.1 si el hp = 0 del ususario, usuario pierde. aparece nota de batalla perdida y 
                          aparece btn de reset para iniciar juego nuevo
                2.2.2.1.2 si el hp = 0 del enemigo, aparece nota de derrota de enemigo. enemigo desaparece de 
                          enemigos disponibles y se permite iniciar otra battalla con otro personaje en caso de 
                          haber otros enemigos disponibles. aparece nota de click a tu enemigo, enemigo pasa a modo defender 
                          (inicia funcion batle)
                          2.2.2.1.2.1 permanece nivel de ataque del usuario obtenido de batallas previas
                2.2.2.1.3 si el hp = 0 del enemigo, aparece nota de derrota de enemigo. enemigo desaparece de 
                          enemigos disponibles, si ya no se encuentran enemigos disponibles. El juego acaba, aprece
                          nota ganaste y btn de nuevo juego. (inicia funcion inicio de juego)
*/)
