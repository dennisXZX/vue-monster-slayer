new Vue({
  el: '#app',
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: [],
      playerHealthColor: 'green',
      monsterHealthColor: 'green'
    }
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.playerHealthColor = 'green';
      this.monsterHealthColor = 'green';
    },
    attack: function () {
      this.playerAttack(3, 10, 'NORMAL_ATTACK');

      // check if anyone has won the game
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack: function () {
      this.playerAttack(10, 20, 'SPECIAL_ATTACK');

      this.monsterAttack();
    },
    heal: function () {
      const healPower = 10;

      // add a new turn to the log
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for ' + healPower
      });

      // make sure the player health will never go beyond 100
      if (this.playerHealth <= 90) {
        this.playerHealth += healPower;
      } else {
        this.playerHealth = 100;
      }

      this.monsterAttack();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    playerAttack: function (minDamage, maxDamage, attackMode) {
      const playerDamage = this.calculateDamage(minDamage, maxDamage);

      // add a new turn based on attack mode
      switch (attackMode) {
        case 'NORMAL_ATTACK':
          this.turns.unshift({
            isPlayer: true,
            text: 'Player hits Monster for ' + playerDamage
          });
          break;
        case 'SPECIAL_ATTACK':
          this.turns.unshift({
            isPlayer: true,
            text: 'Player hits Monster hard for ' + playerDamage
          });
          break;
        default:
          break;
      }

      this.monsterHealth -= playerDamage;

      // determine the monster health color
      if (this.monsterHealth >= 70) {
        this.monsterHealthColor = 'green';
      } else if (this.monsterHealth >= 40) {
        this.monsterHealthColor = 'orange';
      } else {
        this.monsterHealthColor = 'red';
      }

    },
    monsterAttack: function () {
      const monsterDamage = this.calculateDamage(5, 12);

      // add a new turn to the log
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + monsterDamage
      });

      this.playerHealth -= monsterDamage;

      // determine the player health color
      if (this.playerHealth >= 70) {
        this.playerHealthColor = 'green';
      } else if (this.playerHealth >= 40) {
        this.playerHealthColor = 'orange';
      } else {
        this.playerHealthColor = 'red';
      }

      this.checkWin();
    },
    calculateDamage: function (minDamage, maxDamage) {
      // damage would be either min or the random number, depending on which num is bigger
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }

      return false;
    }
  }
});