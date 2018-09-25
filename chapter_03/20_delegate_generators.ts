// Remember to enable
// "lib": [ "es2015.promise", "dom", "es5", "es2015.generator", "es2015.iterable" ]
// "downlevelIteration": true
// in tsconfig.json
namespace delegate_generators_demo_1 {

    function* g1() {
        yield 2;
        yield 3;
        yield 4;
        }

    function* g2() {
        yield 1;
        yield* g1();
        yield 5;
    }

    var iterator1 = g2();

    console.log(iterator1.next()); // {value: 1, done: false}
    console.log(iterator1.next()); // {value: 2, done: false}
    console.log(iterator1.next()); // {value: 3, done: false}
    console.log(iterator1.next()); // {value: 4, done: false}
    console.log(iterator1.next()); // {value: 5, done: false}
    console.log(iterator1.next()); // {value: undefined, done: true}

}

namespace delegate_generators_demo_2 {

    function* g1() {
        yield 1;
        yield* [2, 3, 4];
        yield 5;
    }

    var iterator = g1();

    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 2, done: false}
    console.log(iterator.next()); // {value: 3, done: false}
    console.log(iterator.next()); // {value: 4, done: false}
    console.log(iterator.next()); // {value: 5, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}

}
