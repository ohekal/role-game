import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "/utils.js";

class Character {
  constructor(data) {
    Object.assign(this, data);
    this.dicehtml = getDicePlaceholderHtml(this.diceCount);
    this.maxHealth = this.Health;
  }

  setDicehtml() {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.dicehtml = this.currentDiceScore
      .map((nums) => `<div class="dice">${nums}</div>`)
      .join(" ");
  }
  tackDamage(attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce((ini, cur) => ini + cur);
    this.Health -= totalAttackScore;
    if (this.Health <= 0) {
      this.Health = 0;
      this.dead = true;
    }
  }

  getHealthBarHtml() {
    const percent = getPercentage(this.Health, this.maxHealth);
    return `<div class="health-bar-outer">
    <div class="health-bar-inner ${
      percent < 26 ? "danger" : ""
    }" style="width:${percent}% ;" >
    </div>
</div>`;
  }
  getCharacterHtml(data) {
    const { Name, Avatar, Health, dicehtml } = this;
    const healthBar = this.getHealthBarHtml();
    return `
     <div class="character-card">
              <h4 class="name"> ${Name} </h4>
              <img class="avatar" src="${Avatar}"/>
              <p class="health">health: <b> ${Health}</b></p>
              ${healthBar}
              <div class="dice-container">${dicehtml}</div>
          </div>`;
  }
}
export { Character };
