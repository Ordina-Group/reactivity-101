/*
  This is an example Signal implementation inspired by the Observable pattern but using a Class for a nicer API.
  It also contains a computed() helper to compose and / or derive values from one ore more Signals.
  You can run this example like this:
  
  npx ts-node ./examples/signals/signal-as-class-with-computed.ts
*/

type Subscriber<T> = {
  id: string;
  notifySubscriber: (val: T) => void;
};

function generateRandomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

class Signal<T> {
  private _subscribers: Subscriber<T>[] = [];

  constructor(private _value: T) {}

  get value() {
    return this._value;
  }

  set(value: T) {
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

type Input<T> = {
  [K in keyof T]: T[K];
};

type InputSignal<T> = {
  [K in keyof T]: Signal<T[K]>;
};

function computed<A extends unknown[], R>(
  getComputedValue: (...values: Input<A>) => R,
  dependencies: [...InputSignal<A>]
): Signal<R> {
  const resultSignal = new Signal<R>(null as R);

  dependencies.forEach((signal) => {
    signal.observe(() => {
      const latestValues = dependencies.map((s) => s.value);
      resultSignal.set(getComputedValue(...(latestValues as [...Input<A>])));
    });
  });

  return resultSignal;
}

const signal1 = new Signal(1);
const signal2 = new Signal(2);

const multiply = computed((a, b) => a + b, [signal1, signal2]);
const sum = computed((a, b) => a + b, [signal1, signal2]);
