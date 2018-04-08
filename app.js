new Vue({
  el: '#app',
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
    }
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
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

      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for ' + healPower
      });

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
    },
    monsterAttack: function () {
      const monsterDamage = this.calculateDamage(5, 12);

      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + monsterDamage
      });

      this.playerHealth -= monsterDamage;
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