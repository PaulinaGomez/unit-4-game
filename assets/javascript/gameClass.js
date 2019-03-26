class Character {
    constructor(hp, attack, name) {
        this.hp = hp;
        this.attack = attack;
        this.name = name;
        this.isUserCharacter = false;
        this.setupHtml();
    }

    setupHtml() {
        this.characterHTML = $(".character-blueprint").clone();
        this.characterHTML.removeClass("hidden");
        this.characterHTML.removeClass("character-blueprint");
        this.characterHTML.addClass("character col-md-3");
        
        let characterCard = this.characterHTML.children();
        characterCard.attr("data-hp", this.hp);
        characterCard.attr("data-attack", this.attack);

        let characterImage = this.characterHTML.find("img");
        characterImage.attr("src", `./assets/images/${this.name}.jpg`);

        let characterName = this.characterHTML.find(".character-name");
        characterName.text(this.name);

        let characterHp = this.characterHTML.find(".hp");
        characterHp.text(this.hp);

        let characterAttack = this.characterHTML.find(".attack");
        characterAttack.text(this.attack);

        this.characterHTML.on("click", this.onClick);

        $(".chacters").prepend(this.characterHTML);
    }

    onClick() {
        if(!userHasPickedCharacter) {
            this.isUserCharacter = true;
            $(".enemies").append(this.characterHTML);
        }
    }
}
var userHasPickedCharacter = false;

$(document).ready(function () {
    var comInstructions = document.getElementsByClassName("lead")[0];
    comInstructions.innerHTML = "<h3>I am COM, ready to play?</h3>";

    var contador = 0; //<----- numero de clicks instrucciones
    
    var user = $("<div id=userName></div>"); //<------- div for Text User when player is choosed
    var oponent = $("<div id=opponentName></div>");//<------- div for Text Oponent when player is choosed
    var dataHpUser = 0;
    var dataHpOponent = 0;
    var dataUserAttackCounter = 1;
    var dataAttackOponent = 0;

    var btnattack;
    var btnreset;

    createbtnattack();
    createbtnreset();

    const hippolyta = new Character(50, 100, "hippolyta");
    const hades = new Character(50, 100, "hades");
    const zeus = new Character(50, 100, "zeus");
    const athena = new Character(50, 100, "athena");

    $(".btn.btn-primary.btn-lg").on("click", function () {
        if (contador == 0) {
            comInstructions.innerHTML = "<h3>Choose your Character</h3>";
            contador++;
        }

        else if (contador == 1) {
            comInstructions.innerHTML = "<h3>Battle to Death, choose an enemy!</h3>";
        }
    });

    $(".card.character").on("click", function () { //<---- click on character img
        if (!userHasPickedCharacter) { //<---- first click 
            pickUserCharacter(this);
        }
        else {
            pickEnemyCharacter(this);
        }
    });

    function pickUserCharacter(characterImagePicked) {
        //Modify the HTML of the character we picked
        player = $(characterImagePicked).addClass("user"); //<---- add attribute data-user to card character clicked 
        user.text("User Character");    //<---- add text "User Caracter" to user variable "new div"   
        $(characterImagePicked).prepend(user); //<---- append div user with new text to ".col-md-3 first"
        $(".col-md-3.first").append($(characterImagePicked)); //<---- click on ".card character" to ".col-md-3 first"
        $(".row:last").append($(".card.character:not(.user)"));

        //Grab the stats of the character we picked
        dataHpUser = parseInt($(".user").attr("data.hp"));
        dataAttackUser = parseInt($(".user").attr("data.attack"));

        userHasPickedCharacter = true;
    }

    function pickEnemyCharacter(characterImagePicked) {
        var isUserCharacter = $(characterImagePicked).hasClass("user");
        if ($(".enemy").length === 0 && !isUserCharacter) {
            //Modify the HTML of the enemy we picked
            comEnemy = $(characterImagePicked).addClass("enemy");
            oponent.text("Oponent");  //<---- add text "Oponent" to oponent variable "new div" 
            $(characterImagePicked).prepend(oponent);
            $(".col-md-3.fourth").append($(characterImagePicked));

            //Grab the stats of the enemy we picked
            dataHpOponent = parseInt($(".enemy").attr("data.hp"));
            dataAttackOponent = parseInt($(".enemy").attr("data.attack"));

            //Display the button for attacking, as we now have a target
            btnattack.show();
        }
    }

    function createbtnattack() { //<---- btn attack function
        btnattack = $("<button>");
        btnattack.addClass("btn-attack");
        btnattack.text("Attack");
        $(".col-md-3.second").append(btnattack);
        btnattack.hide();
        $(btnattack).on("click", fight);
    }

    function createbtnreset() { //<---- btn reset function
        btnreset = $("<button>");
        btnreset.addClass("btn-reset");
        btnreset.text("Reset");
        $(".col-md-3.third").append(btnreset);
        btnreset.hide();
        $(btnreset).on("click", function () {
            window.location.reload();
        });
    }

    function fight() { //<---- hp / attack level
        dataHpUser -= dataAttackOponent;
        dataHpOponent -= dataAttackUser * dataUserAttackCounter;
        dataUserAttackCounter++;

        $(".user #hp").text(dataHpUser);
        $(".enemy #hp").text(dataHpOponent);

        if (dataHpUser <= 0) {
            alert("You loose. . .but try again");
            btnattack.hide();
            btnreset.show();
        }
        else if (dataHpOponent <= 0) {
            alert("You win. . . pick another oponnent");
            btnattack.hide();
            $(".enemy").remove();
        }
    }
});

// $(".user").attr("data.hp");
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
*/
