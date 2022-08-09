class Game {
  constructor() {
   this.placar=createElement("h2") 
   this.colocacao1=createElement("h2")
   this.colocacao2=createElement("h2")
   this.botao=createButton("")

  }


  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.placar.html("placar")
    this.placar.position(width/3-60,40)
    this.placar.class("resetText")
    this.colocacao1.position(width/3-50,80)
    this.colocacao1.class("leadersText")
    this.colocacao2.position(width/3-50,130)
    this.colocacao2.class("leadersText")
    this.botao.position(width/2+230,100)
    this.botao.class("resetButton")
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      this.showRank()
      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          //alterar a posição da câmera na direção y
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }

      }
      
      this.handlePlayerControls();

      drawSprites();
    }

  }
 showRank(){
  var placar1
  var placar2
  var jogadores=Object.values(allPlayers)
  if((jogadores[0].rank==0 && jogadores[1].rank==0 )|| jogadores[0].rank==1){
    placar1=jogadores[0].rank+"&emsp;"+jogadores[0].name+"&emsp;"+jogadores[0].score  
    placar2=jogadores[1].rank+"&emsp;"+jogadores[1].name+"&emsp;"+jogadores[1].score  
  }
 
  if( jogadores[1].rank==1){
    placar1=jogadores[1].rank+"&emsp;"+jogadores[1].name+"&emsp;"+jogadores[1].score  
    placar2=jogadores[0].rank+"&emsp;"+jogadores[0].name+"&emsp;"+jogadores[0].score
  }
  this.colocacao1.html(placar1)
  this.colocacao2.html(placar2)
}
 
  handlePlayerControls() {
    // manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
  reset(){
 this.botao.mousePressed(()=>{
  database.ref("/").set({
    carsAtEnd:0
  })})
  }
}
