---
id: Leetcode-2353
title: 2353. Design a Food Rating System
tags:
  - Leetcode
last_update:
  date: 2023-12-17
---

## 題目

[完整題目](https://leetcode.com/problems/design-a-food-rating-system/)

Design a food rating system that can do the following:

Modify the rating of a food item listed in the system.
Return the highest-rated food item for a type of cuisine in the system.
Implement the FoodRatings class:

- FoodRatings`(String[] foods, String[] cuisines, int[] ratings)` Initializes the system. The food items are described by `foods`, `cuisines` and `ratings`, all of which have a length of n.

  - `foods[i]` is the name of the $i^{th}$ food,
  - `cuisines[i]` is the type of cuisine of the $i^{th}$ food, and
  - `ratings[i]` is the initial rating of the $i^{th}$ food.

- `void changeRating(String food, int newRating)` Changes the rating of the food item with the name food.
- `String highestRated(String cuisine)` Returns the name of the food item that has the highest rating for the given type of cuisine. If there is a tie, return the item with the lexicographically smaller name.
- Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

**Example 1**

```
Input
["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
[[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output
[null, "kimchi", "ramen", null, "sushi", null, "ramen"]

Explanation
FoodRatings foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
foodRatings.highestRated("korean"); // return "kimchi"
                                    // "kimchi" is the highest rated korean food with a rating of 9.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // "ramen" is the highest rated japanese food with a rating of 14.
foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "sushi"
                                      // "sushi" is the highest rated japanese food with a rating of 16.
foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // Both "sushi" and "ramen" have a rating of 16.
                                      // However, "ramen" is lexicographically smaller than "sushi".

```

**Constraints**

- 1 <= n <= 2 \* $10^4$
- n == foods.length == cuisines.length == ratings.length
- 1 <= foods[i].length, cuisines[i].length <= 10
- foods[i], cuisines[i] consist of lowercase English letters.
- 1 <= ratings[i] <= $10^8$
- All the strings in foods are distinct.
- food will be the name of a food item in the system across all calls to changeRating.
- cuisine will be a type of cuisine of at least one food item in the system across all calls to highestRated.
- At most 2 \* $10^4$ calls in total will be made to changeRating and highestRated.

## 題目難易度

Medium

## 解題想法

題目要求寫一個食物評分的系統，會有更改評分和取得某種食物種類最高分食物的功能。

基本上功能並不難，但麻煩的是若不用 Priority Queue 之類的功能會容易 timeout。

## 初試

> Runtime: 2633ms, 9.09%

> Memory Usage: 91.36MB, 100%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
var FoodRatings = function (foods, cuisines, ratings) {
  this.foods = foods;
  this.cuisines = cuisines;
  this.ratings = ratings;
};

/**
 * @param {string} food
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function (food, newRating) {
  for (let i = 0; i < this.foods.length; i++) {
    if (food === this.foods[i]) {
      this.ratings[i] = newRating;
    }
  }
};

/**
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function (cuisine) {
  let rated = 0;
  let name = [];
  for (let i = 0; i < this.foods.length; i++) {
    if (this.cuisines[i] === cuisine && rated <= this.ratings[i]) {
      if (rated < this.ratings[i]) {
        rated = this.ratings[i];
        name = [this.foods[i]];
      } else {
        name.push(this.foods[i]);
      }
    }
  }
  name.sort();
  return name[0];
};

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */
```

timeout 版本

```javascript
/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
var FoodRatings = function (foods, cuisines, ratings) {
  this.x = new Map();
  for (let i = 0; i < foods.length; i++) {
    this.x.set(foods[i], {
      food: foods[i],
      cuisine: cuisines[i],
      rating: ratings[i],
    });
  }
};

/**
 * @param {string} food
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function (food, newRating) {
  this.x.set(food, {
    ...this.x.get(food),
    rating: newRating,
  });
};

/**
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function (cuisine) {
  const r = [...this.x]
    .filter((x) => x[1].cuisine === cuisine)
    .sort((a, b) => b[1].rating - a[1].rating);
  const rr = r
    .filter((x) => x[1].rating === r[0][1].rating)
    .sort((a, b) => {
      return a[0].charCodeAt(0) - b[0].charCodeAt(0);
    });
  return rr[0][1].food;
};

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */
```
