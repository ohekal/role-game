import { charData } from "/data.js";
import { Character } from "/character.js";

let monstersArray = ["orc", "demon", "goblin"];

let isWaiting = false;

function getNewMonster() {
  const nextMonsterData = charData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}
function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

function endGame() {
  isWaiting = true;
  const endMessage =
    wizard.Health === 0 && monster.Health === 0
      ? "No victors - all creatures are dead"
      : wizard.Health > 0
      ? "The Wizard Wins"
      : `the ${monster.Name} is Victorious`;

  const endEmoji = wizard.Health > 0 ? "🔮" : "☠️";
  setTimeout(() => {
    document.body.innerHTML = `<div class="end-game">
  <h2>Game Over</h2>
  <h3>${endMessage}</h3>
  <p class="end-emoji">${endEmoji}</p>
</div>`;
  }, 1500);
}
function attack() {
  if (!isWaiting) {
    wizard.setDicehtml();
    monster.setDicehtml();
    wizard.tackDamage(monster.currentDiceScore);
    monster.tackDamage(wizard.currentDiceScore);
    render();
    if (wizard.dead) {
      endGame();
    } else if (monster.dead) {
      isWaiting = true;
      if (monstersArray.length > 0) {
        setTimeout(() => {
          monster = getNewMonster();
          render();
          isWaiting = false;
        }, 1500);
      } else {
        endGame();
      }
    }
  }
}

document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(charData.hero);
let monster = getNewMonster();

render();
