// <==== Saiyan Adventure ====>

const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');


// <==== Game Engine ====>

let saiyanClass = [
{ status: 'Legendary', base: 1000, strength: 60, defense: 60, pride: 60, heart: 1, stamina: 5550},  
{ status: 'Royal Blood', base: 850, strength: 50, defense: 50, pride: 50, heart: 10, stamina: 5660}, 
{ status: 'Super Elite', base: 600, strength: 40, defense: 40, pride: 40, heart: 20, stamina: 5000},
{ status: 'Elite', base: 550, strength: 30, defense: 30, pride: 30, heart: 30, stamina: 6110},
{ status: 'Mid-Class', base: 400, strength: 20, defense: 20, pride: 20, heart: 45, stamina: 6670},
{ status: 'Low-Class', base: 240, strength: 10, defense: 10, pride: 15, heart: 65, stamina: 6850},
];
let warriorIndex = Math.floor(Math.random() * saiyanClass.length);
let warrior = saiyanClass[warriorIndex];
let warriorStatus = warrior.status;



let enemyClass = [
    { name: 'Buu', base: 1000, strength: 60, defense: 60, pride: 60, heart: 1, stamina: 10000},  
    { name: 'Cell', base: 850, strength: 50, defense: 50, pride: 50, heart: 10, stamina: 6000},
    { name: 'Frieza', base: 600, strength: 40, defense: 40, pride: 40, heart: 20, stamina: 4000},
    { name: 'Raditz', base: 550, strength: 30, defense: 30, pride: 30, heart: 30, stamina: 3750},
    { name: 'Nappa', base: 400, strength: 20, defense: 20, pride: 20, heart: 45, stamina: 3500},
    { name: 'Pilaf', base: 240, strength: 10, defense: 10, pride: 15, heart: 65, stamina: 3250},
    ];

    const enemyMoves = ['Attack', 'Defend', 'Special', 'Rage', 'Recharge'];

    let enemyIndex = Math.floor(Math.random() * enemyClass.length);
    let enemy = enemyClass[enemyIndex];
    let enemyStatus = enemy.status;
    let enemyName = enemy.name;
    let yourHealth = warrior.base;
    let ennemyHealth = enemy.base;
    let rage = false;

    console.log(`Your name is ${username}, and you are a(n) ${warriorStatus} Saiyan`);
    console.log(`You will be fighting ${enemyName}`);

// <==== Game ====>

function userTurn(warrior) {
    console.log('Your turn:');
    console.log('1. Attack');
    console.log('2. Defend');
    console.log('3. Special');
    console.log('4. Super Saiyan'); // Change 'Rage' to 'Super Saiyan'
    console.log('5. Recharge Stamina');
    const choice = prompt('Choose your move (1/2/3/4): ');

    switch (choice) {
        case '1':
            return { move: 'Attack', strengthMultiplier: 1, description: 'Your Saiyan launches a fierce attack!' };
        case '2':
            return { move: 'Defend', strengthMultiplier: 1, description: 'Your Saiyan takes a defensive stance.' };
        case '3':
            return { move: 'Special', strengthMultiplier: 2, description: 'Your Saiyan unleashes a powerful special attack!' };
        case '4':
            return { move: 'Super Saiyan', strengthMultiplier: warrior.heart * warrior.base / 1000, description: 'Your Saiyan transforms into Super Saiyan, boosting its strength!' }; // Change 'Rage' to 'Super Saiyan'
        case '5':
            return { move: 'Recharge', description: 'Your Saiyan focuses and replenishes its stamina.' };
        default:
            console.log('Invalid choice. Please choose again.');
            return userTurn(warrior); // Ask again if choice is invalid
    }
}

// Function for enemy's turn (picks a random move from the enemyMoves array)
function enemyTurn() {
    return enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
}

// Function to simulate a battle turn
function battleTurn(userMove, enemyMove, warrior, enemy) {
    console.log(`\n--- Turn Begins ---`);
    console.log(userMove.description);
    console.log(`The enemy prepares to ${enemyMove}`);

    // Determine the effects of user's move
    let userDamage = 0;
    let enemyDamage = 0;

    switch (userMove.move) {
        case 'Attack':
            userDamage = warrior.strength * userMove.strengthMultiplier;
            break;
        case 'Defend':
            userDamage = -10; // Reduce enemy damage by 10 if defending
            break;
        case 'Special':
            userDamage = warrior.strength * 2 * userMove.strengthMultiplier; // Double damage for special attack
            break;
        case 'Super Saiyan':
            userDamage = warrior.strength * userMove.strengthMultiplier;
            warrior.stamina -= 2750; // Reduce stamina for Super Saiyan
            break;
        case 'Recharge':
            warrior.stamina += 500; // Recharge 50 stamina
            console.log(`Your Saiyan replenishes 500 stamina. Your Saiyan's stamina: ${warrior.stamina}`);
            break;
    }

    // Determine the effects of enemy's move
    switch (enemyMove) {
        case 'Attack':
            enemyDamage = Math.max(0, Math.floor(Math.random() * 300)); // Random damage between 0 and 300
            break;
        case 'Defend':
            enemyDamage = -5; // Reduce user damage by 5 if defending
            break;
        case 'Special':
            enemyDamage = Math.max(0, Math.floor(Math.random() * 400)); // Random damage between 0 and 40 for special attack
            break;
        case 'Rage': // Implement rage for enemy
            enemyDamage = Math.max(0, Math.floor(Math.random() * 350)) * 1.5; // Random damage between 0 and 350, multiplied by 1.5 for rage
            enemy.stamina -= 1000; // Reduce stamina for enemy's rage
            break;
        case 'Recharge':
            enemy.stamina += 500; // Recharge 50 stamina for enemy
            console.log(`The enemy replenishes 500 stamina. Enemy's stamina: ${enemy.stamina}`);
            break;
    }

    // Apply damage to warrior and enemy
    warrior.stamina -= enemyDamage;
    warrior.stamina = Math.max(0, warrior.stamina); // Ensure stamina doesn't go negative
    console.log(`Your Saiyan takes ${enemyDamage} damage. Your Saiyan's stamina: ${warrior.stamina}`);

    if (warrior.stamina <= 0) {
        console.log('Your Saiyan has been defeated!');
        return;
    }

    enemy.stamina -= userDamage;
    enemy.stamina = Math.max(0, enemy.stamina); // Ensure stamina doesn't go negative
    console.log(`The enemy takes ${userDamage} damage. Enemy's stamina: ${enemy.stamina}`);

    if (enemy.stamina <= 0) {
        console.log('The enemy has been defeated!');
        return;
    }

    console.log(`--- Turn Ends ---\n`);
}

// Start the battle
console.log(`Your Saiyan (${warrior.status}) vs The enemy`);

while (warrior.stamina > 0 && enemy.stamina > 0) {
    const userMove = userTurn(warrior);
    const enemyMove = enemyTurn();

    battleTurn(userMove, enemyMove, warrior, enemy);
}