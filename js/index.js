new Vue({
    el: '#app',
    data: {
        progress_health_you: 100,
        progress_health_monster: 100,
        is_new_game: false
    },
    methods: {
        startNewGame: function() {
            this.is_new_game = !this.is_new_game;
            this.progress_health_you = 100;
            this.progress_health_monster = 100;
        },

        giveUpGame: function() {
            this.is_new_game = !this.is_new_game;
        },

        validateHealth: function(){
            if (this.progress_health_monster <= 0){
                this.progress_health_monster = 0;
                if(confirm("You win! New game?")){
                    this.is_new_game = false;
                    this.startNewGame();
                }
            }

            if (this.progress_health_you <= 0){
                this.progress_health_you = 0;
                if(confirm("Oh no! The monster win the game =(. New game?")){
                    this.is_new_game = false;
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

            this.validateHealth();
        },
        
        monsterAttack: function() {
            var number = this.generateRandomNumber();
            
            this.progress_health_you -= number;
            this.validateHealth();
        },
        
        specialAttack: function() {
            var number = this.generateRandomNumberToSpecialAttack();

            this.progress_health_monster -= number;

            this.monsterAttack();
            this.validateHealth();
        },
        
        heal: function() {
            var number = this.generateRandomNumber();

            this.progress_health_you += number;
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
        },

        logAttack: function(valueYouAttack, valueMonsterAttack) {

        }
    }
});