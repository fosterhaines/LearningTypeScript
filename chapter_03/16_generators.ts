// Remember to enable
// "lib": [ "es2015.promise", "dom", "es5", "es2015.generator", "es2015.iterable" ]
// in tsconfig.json
namespace generators1 {

    function *foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        return 5;
    }

    let bar = foo();
    bar.next(); // Object {value: 1, done: false}
    bar.next(); // Object {value: 2, done: false}
    bar.next(); // Object {value: 3, done: false}
    bar.next(); // Object {value: 4, done: false}
    bar.next(); // Object {value: 5, done: true}
    bar.next(); // Object { done: true }

}

namespace generators2 {

    function* foo() {
        let i = 1;
        while (true) {
            yield i++;
        }
    }

    let bar = foo();
    bar.next(); // Object {value: 1, done: false}
    bar.next(); // Object {value: 2, done: false}
    bar.next(); // Object {value: 3, done: false}
    bar.next(); // Object {value: 4, done: false}
    bar.next(); // Object {value: 5, done: false}
    bar.next(); // Object {value: 6, done: false}
    bar.next(); // Object {value: 7, done: false}

}
