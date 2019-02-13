// const friends = [
//   { id: 1, name: 'Sting', nearMe: true },
//   { id: 2, name: 'Radiohead', nearMe: true },
//   { id: 3, name: 'NIN', nearMe: false },
//   { id: 4, name: 'Echo', nearMe: true },
//   { id: 5, name: 'Zeppelin', nearMe: false }
// ];
// const isNearMe = ({ nearMe }) => nearMe;
// const getName = ({ name }) => name;

// const map = (a => b) => step => reducer;

// const getFriendsNearMe = compose(
//   filter(isNearMe),
//   map(getName)
// );
// const results2 = toArray(getFriendsNearMe, friends);

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

// step is a reducer
// map, filter, doubleEvens are transducer

const map = f => step => (a, c) => step(a, f(c));
const filter = predicate => step => (a, c) => (predicate(c) ? step(a, c) : a);

const isEven = n => n % 2 === 0;
const double = n => n * 2;

const doubleEvens = compose(
  filter(isEven),
  map(double)
);

const arrayConcat = (a, c) => a.concat([c]);
const xform = doubleEvens(arrayConcat);

const result = [1, 2, 3, 4, 5, 6].reduce(xform, []); // [4, 8, 12]

console.log(result);
