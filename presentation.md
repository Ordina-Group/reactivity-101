---
title: 'Reactive Programming in the Frontend'
---

# Reactivity 101

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
```
 

```html
<div>
	<span class="counter"></span>
	
	<button class="counterMin">-</button>
	<button class="counterPlus">+</button>
</div>
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

### Exercise 1

Write your own Signal!

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

---

## Review exercise 2

Note: Show & Tell, what worked, what was difficult? Optionally show an example solution. // TODO - Create example solution exercise 2.

---

## What do frameworks do for us?

Note: Now you've written a (partial) signal yourself, you can imagine the complications it involves. And why every framework has their own. 

----

### Two-way binding

Note: Keeping values in sync between components/services and the HTML/DOM.

----

### Change Detection

Note: Frameworks keep track of Signals and their usage for you, so it knows when to trigger change detection and keep things like two-way binding working.

----

### Compiler hints

Note: Some frameworks, like Svelte, use Signals(/Runes) as a compiler hint. This tells the compiler that this value is not just a value, and tracks wherever the value is used, to tie that in with any changes of the value. (Angular sort of uses Signals as a compiler hint too for the template compiler).

----

... // TODO Add more.

---

## Signal usage

When do you use a Signal?

Should we make every value a Signal?

Note: Discuss. 

----

Note: https://dev.to/ducin/signals-are-values-not-events-10bn - example article talking and touching about these points.

// TODO More to brief? Where to draw the line? When to combine/group values in an Object and use that in the signal. This is more state management then "Signals"...

// TODO Exercise where we have an imperative (Angular?) example; rewrite it using Signals, make it more reactive, refactor. 20 minutes?