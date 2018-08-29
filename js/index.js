new Vue({
    el: '#app',
    data: {
        progress_health_you: 100,
        progress_health_monster: 100,
        is_new_game: false,
        arrayLog: []
    },
    methods: {
        startNewGame: function() {
            this.is_new_game = true;
            this.progress_health_you = 100;
            this.progress_health_monster = 100;
            arrayLog = [];
        },

        giveUpGame: function() {
            this.is_new_game = false;
        },

        validateHealth: function(){
            if (this.progress_health_monster <= 0){
                this.progress_health_monster = 0;
                if(confirm("You win! New game?")){
                    this.startNewGame();
                }
            }

            if (this.progress_health_you <= 0){
                this.progress_health_you = 0;
                if(confirm("Oh no! The monster win the game =(. New game?")){
                    this.startNewGame();
                }
            }
        },
        
        attack: function() {
            this.youAttack();
            this.monsterAttack();
        },
        
        youAttack: function() {
            var number = this.generateRandomNumber();
            
            this.progress_health_monster -= number;
            // A função unshift do array insere o novo registro na primeira posição.
            // Ao contrário da função push, que insere no final da lista
            this.arrayLog.unshift({message: 'Player hits monster for ' + number, class: 'player-turn'});

            this.validateHealth();
        },
        
        monsterAttack: function() {
            var number = this.generateRandomNumber();
            
            this.progress_health_you -= number;
            this.arrayLog.unshift({message: 'Monster hits player for ' + number, class: 'monster-turn'});

            this.validateHealth();
        },
        
        specialAttack: function() {
            var number = this.generateRandomNumberToSpecialAttack();

            this.progress_health_monster -= number;

            this.arrayLog.unshift({message: 'Player hits monster for ' + number, class: 'player-turn'});

            this.monsterAttack();
            this.validateHealth();
        },
        
        heal: function() {
            if(this.progress_health_you <= 90){
                this.progress_health_you += 10;
            } 
            else {
                this.progress_health_you = 100;
            }

            this.arrayLog.unshift({message: 'Player heals himself for ' + 10, class: 'player-turn'});

            this.monsterAttack();
        },
        
        generateRandomNumber: function(){
            let x = 0;
            x = Math.floor((Math.random() * 10) + 1);
            return x;
        },
        
        generateRandomNumberToSpecialAttack: function(){
            let x = 0;
            x = Math.floor(Math.random() * (20 - 10)) + 10;
            return x;
        }
    }
});