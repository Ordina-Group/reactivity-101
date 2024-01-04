/*
  This is an example Signal implementation inspired by the Observable pattern.
  You can run this example like this:
  
  npx ts-node ./examples/signals/signal-in-60-lines.ts
*/

type Subscriber<T> = {
  id: string;
  notifySubscriber: (val: T) => void;
};

type SignalConfig = Partial<{
  emitInitial: boolean; // optional and nice to have
}>;

function generateRandomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

function isEqual(a: any, b: any) {
  return Object.is(a, b);
}

function createSignal<T>(initialValue: T, config?: SignalConfig) {
  let value = initialValue;
  let subscribers: Subscriber<T>[] = [];

  const updateValue = (newValue: T) => {
    // only emit when value is different
    if (isEqual(newValue, value)) {
      return;
    }

    value = newValue;
    subscribers.forEach((s) => s.notifySubscriber(newValue));
  };

  const addSubscriber = (notifySubscriber: (v: T) => void) => {
    const id = generateRandomId();
    subscribers.push({
      id,
      notifySubscriber,
    });

    if (config?.emitInitial) {
      notifySubscriber(value);
    }

    return {
      unsubscribe: () => {
        subscribers = subscribers.filter((s) => s.id !== id);
      },
    };
  };

  return {
    value: () => value,
    set: updateValue,
    subscribe: addSubscriber,
  };
}

const val = createSignal("Test", { emitInitial: true });
val.subscribe(console.log);
val.set("Test2");
