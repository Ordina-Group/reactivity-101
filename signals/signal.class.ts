// npx ts-node ./signals/signal.class.ts

type Subscriberr<T> = {
  id: string;
  notifySubscriber: (val: T) => void;
};

function generateRandomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

class Signal<T> {
  private _subscribers: Subscriberr<T>[] = [];

  constructor(private _value: T) {}

  get value() {
    return this._value;
  }

  set(value: T) {
    // FIXME: this doesnt work with arrays
    // if (Object.is(value, this._value)) {
    //   return;
    // }

    this._value = value;
    this._subscribers.forEach((s) => s.notifySubscriber(this._value));
  }

  observe(notifySubscriber: (v: T) => void) {
    const id = generateRandomId();
    this._subscribers.push({
      id,
      notifySubscriber,
    });

    return {
      unsubscribe: () => {
        this._subscribers = this._subscribers.filter((s) => s.id !== id);
      },
    };
  }
}

function computed<T>(callback: (input: T[]) => T, dependencies: Signal<T>[]) {
  const innerSignal = new Signal(dependencies.map((s) => s.value));

  dependencies.forEach((signal, index) => {
    signal.observe((val) => {
      const currValue = innerSignal.value;
      currValue[index] = val;

      innerSignal.set(currValue);

      callback(currValue);
    });
  });

  return innerSignal;
}

// const myValue = new Signal("Hello");
// const subscription = myValue.observe((a) => console.log(`in subscribe: ${a}`));

// console.log(myValue.value);

// myValue.set("Hi there");
// console.log(myValue.value);

// subscription.unsubscribe();

// myValue.set("should not notifiy");
// console.log(myValue.value);

const signal1 = new Signal("signal1");
const signal2 = new Signal("signal2");

const derived = computed(
  ([a, b]) => {
    return `${a}+${b}`;
  },
  [signal1, signal2]
);

derived.observe(console.log);

signal2.set("signal2 changed");

signal1.set("signal1 changed");
