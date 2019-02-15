const friends = [
  { id: 1, name: 'Sting', nearMe: true },
  { id: 2, name: 'Radiohead', nearMe: true },
  { id: 3, name: 'NIN', nearMe: false },
  { id: 4, name: 'Echo', nearMe: true },
  { id: 5, name: 'Zeppelin', nearMe: false }
];
const isNearMe = ({ nearMe }) => nearMe;
const getName = ({ name }) => name;

// const map = (a => b) => step => reducer;

// const results2 = toArray(getFriendsNearMe, friends);

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x); // x is a reducer

// map, filter are higher-order transducer
// map(double), filter(isEven) are composable:
//  since both have the signature, reducer => reducer

// step is a reducer, (accumulator, current) => accumulator

const map = f => step => (a = step(), c) => step(a, f(c));
const filter = predicate => step => (a, c) => (predicate(c) ? step(a, c) : a);

const isEven = n => n % 2 === 0;
const double = n => n * 2;

const doubleEvens = compose(
  filter(isEven),
  map(double)
); // doubleEvens is a transducer

// (a, c) => step(a, double(c));

// (a, c) => (predicate(c) ? (a, c) => step(a, double(c))(a, c) : a);

const arrayConcat = (a, c) => {
  if (!a.concat) {
    return [c]; //this is bad actually
  } else {
    return a.concat([c]); // arrayConcat is the step, a reducer
  }
  // console.log(a);
};
const xform = doubleEvens(arrayConcat); // xform is a reducer

const result1 = [1, 2, 3, 4, 5, 6].reduce(
  (a, c) => (isEven(c) ? arrayConcat(a, double(c)) : a),
  []
);

const result2 = [1, 2, 3, 4, 5, 6].reduce(xform, []); // [4, 8, 12]

const result3 = [1, 2, 3, 4, 5, 6].reduce(xform); // [4, 8, 12]
console.log(result1, result2, result3);
