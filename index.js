//jshint esversion: 8

const CARDS = ["9_of_diamonds.svg", "ace_of_clubs.svg", "7_of_hearts.svg",
  "6_of_diamonds.svg", "3_of_hearts.svg", "5_of_spades.svg", "4_of_hearts.svg",
  "2_of_spades.svg", "king_of_spades2.svg", "6_of_spades.svg",
  "king_of_hearts2.svg", "10_of_spades.svg", "10_of_diamonds.svg",
  "queen_of_clubs2.svg", "jack_of_clubs2.svg", "jack_of_spades2.svg",
  "7_of_clubs.svg", "jack_of_hearts2.svg", "8_of_spades.svg",
  "queen_of_diamonds2.svg", "ace_of_hearts.svg", "6_of_clubs.svg",
  "8_of_diamonds.svg", "9_of_hearts.svg", "7_of_diamonds.svg", "3_of_clubs.svg",
  "4_of_clubs.svg", "8_of_hearts.svg", "2_of_diamonds.svg", "queen_of_hearts2.svg",
  "queen_of_spades2.svg", "10_of_clubs.svg", "5_of_clubs.svg", "king_of_diamonds2.svg",
  "2_of_clubs.svg", "ace_of_diamonds.svg", "9_of_spades.svg", "ace_of_spades.svg",
  "5_of_diamonds.svg", "7_of_spades.svg", "3_of_spades.svg", "5_of_hearts.svg",
  "8_of_clubs.svg", "4_of_diamonds.svg", "jack_of_diamonds2.svg", "king_of_clubs2.svg",
  "10_of_hearts.svg", "3_of_diamonds.svg", "4_of_spades.svg", "2_of_hearts.svg",
  "6_of_hearts.svg", "9_of_clubs.svg"
];
const CARD_BACK = "Card_back_01.svg";
const CARD2VALUE = JSON.parse(
  `{"9_of_diamonds.svg": 9, "ace_of_clubs.svg": 11, "7_of_hearts.svg": 7,
  "6_of_diamonds.svg": 6, "3_of_hearts.svg": 3, "5_of_spades.svg": 5,
  "4_of_hearts.svg": 4, "2_of_spades.svg": 2, "king_of_spades2.svg": 10,
  "6_of_spades.svg": 6, "king_of_hearts2.svg": 10, "10_of_spades.svg": 10,
  "10_of_diamonds.svg": 10, "queen_of_clubs2.svg": 10, "jack_of_clubs2.svg": 10,
  "jack_of_spades2.svg": 10, "7_of_clubs.svg": 7, "jack_of_hearts2.svg": 10,
  "8_of_spades.svg": 8, "queen_of_diamonds2.svg": 10, "ace_of_hearts.svg": 11,
  "6_of_clubs.svg": 6, "8_of_diamonds.svg": 8, "9_of_hearts.svg": 9,
  "7_of_diamonds.svg": 7, "3_of_clubs.svg": 3, "4_of_clubs.svg": 4,
  "8_of_hearts.svg": 8, "2_of_diamonds.svg": 2, "queen_of_hearts2.svg": 10,
  "queen_of_spades2.svg": 10, "10_of_clubs.svg": 10, "5_of_clubs.svg": 5,
  "king_of_diamonds2.svg": 10, "2_of_clubs.svg": 2, "ace_of_diamonds.svg": 11,
  "9_of_spades.svg": 9, "ace_of_spades.svg": 11, "5_of_diamonds.svg": 5,
  "7_of_spades.svg": 7, "3_of_spades.svg": 3, "5_of_hearts.svg": 5,
  "8_of_clubs.svg": 8, "4_of_diamonds.svg": 4, "jack_of_diamonds2.svg": 10,
  "king_of_clubs2.svg": 10, "10_of_hearts.svg": 10, "3_of_diamonds.svg": 3,
  "4_of_spades.svg": 4, "2_of_hearts.svg": 2, "6_of_hearts.svg": 6,
  "9_of_clubs.svg": 9}`
);

let dealer_cards = [];
let user_cards = [];

$("#hit-button").addClass('disabled');
$("#stand-button").addClass('disabled');

$("#start-button").on("click", restart_game);

$("#hit-button").on("click", add_card_to_user_and_display);

$("#stand-button").on("click", moment_of_truth);


// functions
function hit_a_card() {
  const index = Math.floor(Math.random() * CARDS.length);
  return CARDS[index];
}

function restart_game() {
  $("#info-board").text("...");
  $("#start-button").text("Restart");
  $("#hit-button").removeClass('disabled');
  $("#stand-button").removeClass('disabled');
  // nullify
  dealer_cards = [];
  user_cards = [];
  // init dealer's cards
  dealer_cards.push(hit_a_card());
  let new_hit = hit_a_card();
  while (true) {
    if (!card_exists(new_hit)) {
      dealer_cards.push(new_hit);
      break;
    }
    new_hit = hit_a_card();
  }
  console.log("dealer cards:", dealer_cards);
  display_card("#dealer-cards", [dealer_cards[0], CARD_BACK]);
  // init user's cards
  new_hit = hit_a_card();
  while (true) {
    console.log("user_cards", user_cards.length);
    if (user_cards.length == 2) break;
    if (!card_exists(new_hit)) {
      user_cards.push(new_hit);
    }
    new_hit = hit_a_card();
  }
  display_card("#user-cards", user_cards);
  if (is_blackjack(user_cards)) {
    $("#info-board").text("You win! Because you get a blackjack!");
    $("#hit-button").addClass('disabled');
    $("#stand-button").addClass('disabled');
  }
}

function display_card(id_name, cards) {
  let text = "";
  for (var i = 0; i < cards.length; i++) {
    text += `<img src="images/${cards[i]}" alt="">`;
  }
  $(id_name).html(
    text
  );
}

function card_exists(card) {
  return dealer_cards.includes(card) || user_cards.includes(card);
}

function add_card_to_user_and_display() {
  add_card_to_user();
  display_card("#user-cards", user_cards);
  if (is_exploding(user_cards)) {
    $("#hit-button").addClass('disabled');
    $("#stand-button").addClass('disabled');
    $("#info-board").text("You lose! Because you reached more than 21 points.");
  }
}

function add_card_to_user() {
  let new_hit = hit_a_card();
  while (true) {
    if (!card_exists(new_hit)) {
      user_cards.push(new_hit);
      break;
    }
    new_hit = hit_a_card();
  }
}

function add_card_to_dealer_and_display() {
  add_card_to_dealer();
  display_card("#dealer-cards", dealer_cards);
}

function add_card_to_dealer() {
  let new_hit = hit_a_card();
  while (true) {
    if (!card_exists(new_hit)) {
      dealer_cards.push(new_hit);
      break;
    }
    new_hit = hit_a_card();
  }

}

function is_exploding(cards) {
  const cards_values = get_cards_values(cards);
  const possible_values = get_possible_values(cards_values);
  if (possible_values.filter(val => (val <= 21)).length === 0) {
    return true;
  }
  else return false;
}

function get_cards_values(cards) {
  const cards_values = [];
  for (var i = 0; i < cards.length; i++) {
    cards_values.push(CARD2VALUE[cards[i]]);
  }
  return cards_values;
}

function get_possible_values(cards_values) {
  let possible_values = [0];
  var i, j; // index for looping
  for (i = 0; i < cards_values.length; i++) {
    let new_possible_values = [];
    if (cards_values[i] != 11) {
      // not ace
      for (j = 0; j < possible_values.length; j++) {
        new_possible_values.push(possible_values[j] + cards_values[i]);
      }
    } else {
      // ace
      for (j = 0; j < possible_values.length; j++) {
        new_possible_values.push(possible_values[j] + 1);
        new_possible_values.push(possible_values[j] + 11);
      }
    }
    possible_values = new_possible_values;
  }
  return possible_values;
}

function is_blackjack(cards) {
  if (cards.length != 2) return false;
  const cards_values = get_cards_values(cards);
  if (cards_values.includes(10) && cards_values.includes(11)) {
    return true;
  }
  return false;
}

// cards should be checked if explode first
// but if the cards explode, it return -Infinity
function get_best_value(cards) {
  const cards_values = get_cards_values(cards);
  const possible_values = get_possible_values(cards_values);
  return Math.max.apply(
    Math,
    possible_values.filter(val => val <= 21)
  );
}

function moment_of_truth() {
  $("#hit-button").addClass('disabled');
  $("#stand-button").addClass('disabled');
  const user_best_value = get_best_value(user_cards);
  console.log(user_cards);
  console.log(user_best_value);
  // dealer
  display_card("#dealer-cards", dealer_cards);
  // while max of card values < 17, rehit
  let dealer_best_value;
  while (true) {
    console.log("while loop of moment_of_truth");
    console.log(dealer_cards);
    dealer_best_value = get_best_value(dealer_cards);
    // the while loop ends either dealer explodes or best value less than 17
    if (dealer_best_value != -Infinity && dealer_best_value < 17) {
      add_card_to_dealer_and_display();
    }
    else {
      break;
    }
  }
  if (is_exploding(dealer_cards)) {
    $("#info-board").text("You win! Because dealer reached more than 21 points.");
    return;
  }
  // if both do not explode, we compare the value
  dealer_best_value = get_best_value(dealer_cards);
  if (dealer_best_value > user_best_value) {
    $("#info-board").text(`You lose! Because dealer (${dealer_best_value}) is greater than you (${user_best_value}).`);
  }
  else if (dealer_best_value < user_best_value) {
    $("#info-board").text(`You win! Because dealer (${dealer_best_value}) is smaller than you (${user_best_value}).`);
  }
  else {
    $("#info-board").text(`It's a tie! Because dealer (${dealer_best_value}) is equal to you (${user_best_value}).`);
  }
}
