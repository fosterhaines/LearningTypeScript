namespace functors_demo_1 {

    class Container<T> {
        public static of<TVal>(val: TVal) {
            return new Container(val);
        }
        private _value: T;
        public constructor(val: T) {
            this._value = val;
        }
        public map<TMap>(fn: (val: T) => TMap) {
            return new Container<TMap>(fn(this._value));
        }
    }

    let double = (x: number) => x + x;
    let container = Container.of(3);
    let container2 = container.map(double);
    console.log(container2); // { _value: 6 }

}

namespace functors_demo_2 {

    class MayBe<T> {
        public static of<TVal>(val?: TVal) {
            return new MayBe(val);
        }
        private _value!: T;
        public constructor(val?: T) {
            if (val) {
                this._value = val;
            }
        }
        public isNothing() {
            return (this._value === null || this._value === undefined);
        }
        public map<TMap>(fn: (val: T) => TMap) {
            if (this.isNothing()) {
                return new MayBe<TMap>();
            } else {
                return new MayBe<TMap>(fn(this._value));
            }
        }
    }

    interface New {
        subreddit: string;
        id: string;
        title: string;
        score: number;
        over_18: boolean;
        url: string;
        author: string;
        ups: number;
        num_comments: number;
        created_utc: number;
    }

    interface Response {
        kind: string;
        data: {
            modhash: string;
            whitelist_status: boolean|null;
            children: Array<{ kind: string, data: New }>;
            after: string|null;
            before: string|null;
        };
    }

    async function fetchNews() {
        return new Promise<MayBe<Response>>((resolve, reject) => {
            const url = "https://www.reddit.com/r/typescript/new.json";
            fetch(url)
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    resolve(new MayBe(json));
                }).catch(() => {
                    resolve(new MayBe());
                });
        });
    }

    (async () => {

        const maybeOfResponse = await fetchNews();

        const maybeOfNews = maybeOfResponse
            .map(r => r.data)
            .map(d => d.children)
            .map(children => children.map(c => c.data));

        maybeOfNews.map((news) => {
            news.forEach((n) => console.log(`${n.title} - ${n.url}`));
            return news;
        });

    })();

}

namespace functors_demo_3 {

    class Nothing<T> {
        public static of<TVal>(val?: TVal) {
            return new Nothing(val);
        }
        private _value: T|undefined;
        public constructor(val?: T) {
            this._value = val;
        }
        public map<TMap>(fn: (val: T) => TMap) {
            if (this._value !== undefined) {
                return new Nothing<TMap>(fn(this._value));
            } else {
                return new Nothing<TMap>(this._value as any);
            }
        }
    }

    class Just<T> {
        public static of<TVal>(val: TVal) {
            return new Just(val);
        }
        private _value: T;
        public constructor(val: T) {
            this._value = val;
        }
        public map<TMap>(fn: (val: T) => TMap) {
            return new Just<TMap>(fn(this._value));
        }
    }

    type Either<T1, T2> = Just<T1> | Nothing<T2>;

    interface New {
        subreddit: string;
        id: string;
        title: string;
        score: number;
        over_18: boolean;
        url: string;
        author: string;
        ups: number;
        num_comments: number;
        created_utc: number;
    }

    interface Response {
        kind: string;
        data: {
            modhash: string;
            whitelist_status: boolean|null;
            children: Array<{ kind: string, data: New }>;
            after: string|null;
            before: string|null;
        };
    }

    async function fetchNews() {
        return new Promise<Either<Response, Error>>((resolve, reject) => {
            const url = "https://www.reddit.com/r/typescript/new.json";
            fetch(url)
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    resolve(new Just(json));
                }).catch((e) => {
                    resolve(new Nothing(e));
                });
        });
    }

    (async () => {

        const maybeOfResponse = await fetchNews();

        // maybeOfResponse.map(r => r.message)
        // Cannot invoke an expression whose type lacks a call signature.
        // Type
        // (<TMap>(fn: (val: Response) => TMap) => Just<TMap>) |
        // (<TMap>(fn: (val: Error) => TMap) => Nothin<TMap>'
        // has no compatible call signatures.

        if (maybeOfResponse instanceof Nothing) {

            maybeOfResponse
                .map(r => r.message)
                .map(msg => {
                    console.log(`Error: ${msg}`);
                    return msg;
                });

        } else {

            const maybeOfNews = maybeOfResponse.map(r => r.data)
                .map(d => d.children)
                .map(children => children.map(c => c.data));

            maybeOfNews.map((news) => {
                news.forEach((n) => console.log(`${n.title} - ${n.url}`));
                return news;
            });
        }

    })();

}
