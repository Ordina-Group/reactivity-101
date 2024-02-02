---
title: 'Reactive Programming in the Frontend'
---

# Reactivity 101

---

<div style="float: left; width: 45%;">
  <img src="./assets/bjorn.jpg" width="100" style="border-radius:100%; display: inline-flex;">
  <h1 style="font-size: 0.9em;">Bjorn Schijff</h1>
  <small style="display: inline-flex;">Frontend Engineer / Architect</small>
  <div>
  	<img src="./assets/codestar.svg" height="30" style="border: 0; background-color: transparent;">
  </div>
  <small>@Bjeaurn</small>
  <br />
  <small>bjorn.schijff@ordina.nl</small>
</div>
<div style="float: right; width: 45%;">
  <img src="./assets/martin.jpg" width="100" style="border-radius:100%; display: inline-flex;">
  <h1 style="font-size: 0.9em;">Martin van Dam</h1>
  <small>Frontend Engineer / Architect</small>
  <div>
    <img src="./assets/codestar.svg" height="30" style="border: 0; background-color: transparent; position: relative" /> 
  </div>
  <small>@MrtnvDam</small>
  <br />
  <small>martin.van.dam@ordina.nl</small>
</div>

---

What is Reactivity?

Note: What is reactivity? What is reactive programming?

----

> Reactive programming is a **declarative** programming paradigm concerned with **data streams** and the **propagation of change**.

<small>https://en.wikipedia.org/wiki/Reactive_programming</small>

Note: Declarative, data streams, propagation of change.

----

```js
var count = 0;

function render() {
	document.getElementById("counter").innerHTML = count;
}

document.getElementById("counterPlus")
		.addEventListener('click', () => {
	count = count + 1;
	render(); // <--- This here...
})
```
 

```html
<div>
	<span class="counter"></span>
	
	<button class="counterPlus">+</button>
</div>
```

Note: Regular variable being updated on click. This is not reactive.

---

```ts
var count = signal(0);

document.getElementById("counter")
		.addEventListener('click', () => {
			count.update(value => value + 1);
		})

// Pseudo-code
computed(() => {
	document.getElementyById("counter").innerHTML = count();
});
```

Note: Pseudo-code for a more Reactive example. Splitting the render logic away from the "business" logic of updating the count. This probably won't work or be different depending on your Signal API.

---

Declarative

Data Streams

Propagation of Changes

----

**Declarative**

```js
// Imperative - This is how NOT to do it.
let count = 0;

function render() {
	document.getElementById("counter").innerHTML = count;
}

document.getElementById("counterPlus")
		.addEventListener('click', () => {
	count = count + 1;
	render(); // <--- This here...
})

document.getElementById("counterMin")
		.addEventListener('click', () => {
			count = count - 1;
			render() // <-- This again. Oh no, I forgot it?!
		})

// How do I see how the count is influenced over time? 
// By different parts of the application?
```
 
Note: Imagine we add another button that influences how the counter changes. The minus example. Now we have two functions, they both influence the same state and have to call the same functions.

----

**Declarative**

```ts
// Angular 17.1+
class ListComponent {
  list = input([]);
  emptyHeading = input('');

  count = computed(() => this.list().length);

  heading = computed(() => {
    if (this.count() > 0) {
      const noun = this.count() > 1 ? 'items' : 'item';
      return this.count() + ' ' + noun;
    }
    return this.emptyHeading();
  });
}
```

Note: A declarative example. We write the "recipe" and every definition has its own easy to follow set of rules.

----

**Data Streams**

You could consider a Signal to be a stream of values that change over time. 

```ts
count = signal(0)

// User clicks a button
count.update(value => value + 1)
// Count is now 1.

// User clicks again (count: 2)
// User may wait for a bit... (count: 2)
// User clicks *again* (count: 3)
```

Note: This is a basic visualisation on how a value might change over time, representing a stream of data. We'll come back to this in the RxJS part.

----

**Propagation of Change**

When a Signal changes, it notifies all interested. You don't have to manually keep track or update the state of another variable. This keeps the code clean and makes the flow of data more "Push" instead of "Pull".

---

### Any modern framework takes care of this problem for you. 

Note: So you can focus on the business logic, not the two-way binding. But the same benefits stay!

----

### Angular example

```ts
@Component({
	...
	template: `<div>{{ counter() }}</div>
	<button (click)="addCount()">+</button>`
}) export class Component {
	counter = signal(0);

	addCount() {
		counter.update(count => count + 1);
	}
}
```

Note: Angular in this example, takes care of subscribing to your counter signal and binding your click to the function. Because of the two-way binding also takes care of updating the value.

----

### React example

```tsx
const Component = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
	  	  +
	    </button>
    </>
  );
};
```

Note: React uses hooks to connect the state value updates to the UI and update it automatically when the state changes.

---

## Pros & Cons

Of Signals

----

## Pros

- Always up to date state of a value
- No need to notify or be aware of other parts of the application
- More declarative approach is possible

----

## Cons

- No real "value over time", only a current state.
- Slightly more complicated API for changing values.
- Not every Signal is the same; some are writeable, some are only calculated.

Note: Point 3: WriteableSignal vs. ComputedSignal.

---

### But what does a Signal do then?

- Holds a (initial) state value
- Receives and stores state changes
- Returns current state on demand
- Keeps track of all listeners
- Informs all listeners on state changes

---

## Exercise 1

### Write your own Signal!

Note: Take 20 minutes for this by default. Depending on the group; discuss approach first, or give hints.

----

Hints
- https://angular.dev/guide/signals#writable-signals

```ts
interface Signal<T> {
  constructor(initialValue: T): void
  setValue: (newValue: T) => void
  getValue: () => T
  getValue: (callback: (value: T) => void) => void;
}
```

Note: This is just an example, feel free to create your own API!

----

Recommended steps:

1. Wrap the value
2. Be able to unwrap and retrieve the value
3. Be able to set and/or update the value
4. Add and keep track of (new) listeners

Note: After this exercise, take a look around. Show & Tell and discussion about the different approaches, did we get it to work?

---

## Exercise 2
### Signal Interaction

Now let's try to use the Signal. 

Note: // TODO - Explanation, hints, bonus 
// TODO Bjorn

---

## Review exercise 2

Note: Show & Tell, what worked, what was difficult? Optionally show an example solution. // TODO - Create example solution exercise 2.

---

## What do frameworks<br />do for us?

Note: Now you've written a (partial) signal yourself, you can imagine the complications it involves. And why every framework has their own. 

----

### Two-way binding

Reflect state changes in the HTML/DOM.

Note: Keeping values in sync between components/services and the HTML/DOM.

----

### Change Detection

Keeps track of state changes and updates all the parts using the state value.

Note: Frameworks keep track of Signals and their usage for you, so it knows when to trigger change detection and keep things like two-way binding working.

----

### Compiler hints

// TODO: not sure how to explain this

// TODO Bjorn

Note: Some frameworks, like Svelte, use Signals(/Runes) as a compiler hint. This tells the compiler that this value is not just a value, and tracks wherever the value is used, to tie that in with any changes of the value. (Angular sort of uses Signals as a compiler hint too for the template compiler).

---

## Different types of Signals

- Writable
- Computable & Readonly
- Effects

----

## Writable Signal

```ts
const count = signal(0)
signal.update(currentValue => currentValue + 1)
```

----

## Computable Signal & Readonly

```ts
const count = signal(2)
const multiply = computed(() => count() * 2)
count.set(3)

const readonlyCount = count.asReadonly()
```

Note: the computed Signal is readonly because it only reacts on its dependencies. Readonly Signals could be useful to expose from services and to be sure no values are updated on other places; predictable data flow.

----

## Effects

```ts
const count = signal(2)
effect(() => {
  console.log(`The value of count changed to: ${count()}`)
  window.localStorage.setItem('count', count())
})

count.set(3)
```

Note: useful for side effects, logging, manipulate localStorage, ...
---

## Exercise 3
### Signals within framworks

Note: You may pick if you want to use Angular or React (or both if you're a star!) 

---

## Review exercise 3

- Signals vs. Hooks
- No manual DOM manipulation needed
- Uses the "brains" of the framework to decide when state reflection is needed
- Great developer experience

// TODO Bjorn - Exercise 3 solution

Note: Ask participants to explain their solution (one of each). Show the group the difference between Angular and React.

---

## Signal usage

When do you use a Signal?

Should we make every value a Signal?

Note: Discuss, ask group about when to use a Signal and when not to use it.

----

## When to use a Signal?

- Reactive current state (Unidirectional flow)
- Granular change detection (Framework)

Note: Reactive current state – When I want other parts of the application to listen to my values, without the values being aware of who is listening. (Unidirectional flow), Change Detection - No memory leaks with Subscriptions, and no dirty checking within the framework.

----

## When to NOT use a Signal?

- Handling (user events)
- Values over time (streams)
- Continous stream of data (immutability)

----

## Wait?! What should I use then???

... RxJS for example 🧐

(CycleJS, BaconJS, MostJS, etc.)

Note: Could also be Promises (native), browser Observables (early stage). RxJS: Only Angular comes with this pre-packaged, and is the only framework that has internal competition for this.

----

Note: https://dev.to/ducin/signals-are-values-not-events-10bn - example article talking and touching about these points.

// TODO More to brief? Where to draw the line? When to combine/group values in an Object and use that in the signal. This is more state management then "Signals"...

// TODO Exercise where we have an imperative (Angular?) example; rewrite it using Signals, make it more reactive, refactor. 20 minutes?

// Kan weg??? 

---

## What is RxJS?

- A better way to manage events within your app.
- More powerful then Signals, but way more options.

---

## Observable Pattern

- What is an Observable?
- What is a Subject?

// TODO - Fix me!

// TODO Martin

---

## RxJS Interop (Angular)

```ts
import { toSignal, toObservable } from '@angular/core/rxjs-interop'

const signal = toSignal(observable$) // From Observable stream to Signal (only current value)

const obs$ = toObservable(signal) // From Signal current value to a stream of Values over time.
```

---

#### Streaming data

```ts
const locationUpdates = webSocket("ws://some-live-shiplocation-api");

locationUpdates.subscribe((newShipLocation) => {
  // update UI with new location i.e.
  this.state.shiplocation = newShipLocation;
});
``` 

// TODO Add operator or more "lively" example - Show what we can do more with Rx in comparison. Debounce, Buffer, Filter? 

---
<!-- 
#### Games

```ts
const ticks = interval(this.tickMs).pipe(map(() => "tick"));
const frames = interval(this.fpsMs).pipe(map(() => "frame"));
const seconds = interval(1000).pipe(map(() => "second"));

this.update$ = merge(ticks, frames, seconds).share();
``` -->

---

#### Communicating between application components

// TODO - Show the difference with a Signal example doing the same.

Service

```ts
export class EventBusService {
  private events = new Subject<Event>();

  getEvents(): Observable<Event> {
    return this.events.asObservable();
  }

  sendEvent(event: Event): void {
    this.events.next(event);
  }
}
```

---

#### Communicating between application components

// TODO: maybe tell here that Signals are a abstraction / kind of BehaviourSubject? and maybe rewrite example below to use BehaviourSubject instead?

Component

```ts
export class Component {
  constructor(private eventsService: EventBusService) {
    this.eventsService
      .getEvents()
      .filter((event) => event.type === "InterestingEvent")
      .subscribe(this.handleEvents);
  }

  doAction(): void {
    this.eventsService.sendEvent(new TestEvent());
  }
f
  handleEvents(event: Event) {
    //... do things
  }
}
```

---

### So, RxJS?

- Implementation of the Observable pattern in Javascript
- Used heavily by `Angular`
- Java/Scala also have their implementation. 
 
Note: Will be zoomed in more in the FP Days given by our colleagues. 

---

// TODO Exercise 5, 6 ? Give an RxJS stream of range 0..100, exercise is to filter only the even values. Show in both RxJS stream (filter) and as a Signal (computed with if statement)


// TODO - Bonus?
// TODO: add short explaination of basic operators

// TODO: simple exercise(s) should follow; maybe handling user events, debounce input value changes? To demonstrate the limitations of Signals and the POWAHH of Observables?

---

#### Verdict

- Use Signals for ...
- Use Observables for ...
