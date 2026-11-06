function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';
    this.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        this.elProgressbar.classList.add('critical');
    } else if (percent < 60) {
        this.elProgressbar.classList.add('low');
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    const dealt = Math.min(count, this.damageHP);
    this.damageHP -= dealt;
    this.renderHP();
    return dealt;
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    renderHP: renderHP,
    changeHP: changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    renderHP: renderHP,
    changeHP: changeHP,
};

const $btnKick = document.getElementById('btn-kick');
const $btnStrong = document.getElementById('btn-strong');
const $log = document.getElementById('log');

function random(num) {
    return Math.ceil(Math.random() * num);
}

function attack(name, enemyMax, selfMax) {
    const hitEnemy = enemy.changeHP(random(enemyMax));
    const hitSelf = character.changeHP(random(selfMax));
    $log.innerText = name + ': ' + enemy.name + ' -' + hitEnemy +
        ', ' + character.name + ' -' + hitSelf;
    checkEnd();
}

function checkEnd() {
    if (enemy.damageHP > 0 && character.damageHP > 0) return;
    let result;
    if (enemy.damageHP === 0 && character.damageHP === 0) {
        result = 'Нічия!';
    } else if (enemy.damageHP === 0) {
        result = character.name + ' переміг!';
    } else {
        result = enemy.name + ' переміг!';
    }
    $log.innerText = result + ' Натисни на логотип, щоб почати знову.';
    $btnKick.disabled = true;
    $btnStrong.disabled = true;
}

function resetGame() {
    character.damageHP = character.defaultHP;
    enemy.damageHP = enemy.defaultHP;
    character.renderHP();
    enemy.renderHP();
    $btnKick.disabled = false;
    $btnStrong.disabled = false;
    $log.innerText = 'Почни бій!';
}

$btnKick.addEventListener('click', function () {
    attack('Thunder Jolt', 20, 10);
});

$btnStrong.addEventListener('click', function () {
    attack('Mega Punch', 35, 20);
});

document.querySelector('.logo').addEventListener('click', resetGame);

resetGame();
