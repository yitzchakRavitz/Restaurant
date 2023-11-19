const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Menu {
  constructor() {
    this.dishes = [];
  }
  addNewDish(dish) {
    this.dishes.push(dish);
  }
  printMenu() {
    console.log("The manu is: ");
    this.dishes.forEach((dishe) => {
      console.log(dishe.name);
    });
  }
}

class Order {
  constructor(tableNumber, specialComments) {
    this.dishes = [];
    this.tableNumber = tableNumber;
    this.specialComments = specialComments;
  }
  addANewDish(dish) {
    this.dishes.push(dish);
  }
}
class Dishe {
  constructor(name, price, preparationTime) {
    this.name = name;
    this.price = price;
    this.preparationTime = preparationTime;
  }
}
class KitchenManager {
  constructor() {
    this.chefs = [];
    this.waiters = [];
  }
  addChef(chef) {
    this.chefs.push(chef);
  }
  addWaiter(waiter) {
    this.waiters.push(waiter);
  }

  //deadlock
  addANewOrder(order) {
    this.chefs.forEach((chef) => {
      if (chef.isAvailable) {
        console.log("find chef");

        chef.order = order;
        chef.isAvailable = false;
        const time = chef.makeOrder(order);
        setTimeout(function () {}, time);
        this.waiters.forEach((waiter) => {
          if (waiter.isAvailable) {
            console.log("find waiter");
            waiter.order = order;
            waiter.isAvailable = false;
            setTimeout(function () {
              waiter.isAvailable = true;
              console.log("done");
            }, 300);
          }
        });
        return;
      }
    });
  }
}

class Waiter {
  constructor(name) {
    this.name = name;
    this.order;
    this.isAvailable = true;
  }
}
class Chef {
  constructor(name) {
    this.name = name;
    this.order;
    this.isAvailable = true;
  }
  makeOrder(order) {
    this.totalTime = 0;
    order.dishes.forEach((dishe) => {
      this.totalTime += dishe.preparationTime;
    });
    return this.totalTime;
  }
}
class Restaurant {
  constructor() {
    this.menu = new Menu();
    this.kitchenManager = new KitchenManager();
    this.restaurantCashFlow;
  }
  takeOrder(order) {
    order.forEach((dishe) => {
      restaurantCashFlow += dishe.price;
    });
    kitchenManager.addANewOrder(order);
  }
}

function main() {
  const restaurant = new Restaurant();
  const dish1 = new Dishe("soup", 15, 100);
  const dish2 = new Dishe("pizza", 25, 300);
  const dish3 = new Dishe("pasta", 22, 300);
  restaurant.menu.addNewDish(dish1);
  restaurant.menu.addNewDish(dish3);
  restaurant.menu.addNewDish(dish2);
  restaurant.menu.printMenu();

  const order1 = new Order(1, "");
  const order2 = new Order(2, "");

  order1.addANewDish(dish3);
  order1.addANewDish(dish2);
  order1.addANewDish(dish1);

  const waiter1 = new Waiter("moshe");
  const waiter2 = new Waiter("yossi");

  const chef1 = new Chef("david");
  restaurant.kitchenManager.addChef(chef1);
  restaurant.kitchenManager.addWaiter(waiter1);
  restaurant.kitchenManager.addWaiter(waiter2);
  restaurant.kitchenManager.addANewOrder(order1);
  console.log(restaurant.kitchenManager);
  console.log(restaurant.kitchenManager);
  console.log(restaurant.menu);
  //   readline.question(
  //     "Enter the number of dishes you want to order: ",
  //     (numDishes) => {
  //       numDishes = parseInt(numDishes);
  //       for (let i = 0; i < numDishes; i++) {
  //         readline.question(`Enter the name of dish  `, (dishName) => {
  //           restaurant.menu.dishes.forEach((dish) => {
  //             if (dish == dishName) {
  //               order2.addANewDish(dishe);
  //               console.log(order2);
  //             }
  //           });
  //           if (i === numDishes - 1) {
  //             readline.close();
  //           }
  //         });
  //       }
  //     }
  //   );
}

main();
