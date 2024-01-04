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

----

### But what does a Signal do then?

- Holds a (initial) state value
- Receives and stores state changes
- Returns current state on demand
- Keeps track of all listeners
- Informs all listeners on state changes

---

### Exercise 1 - 20 min

Write your own Signal!

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

Waarde wrappen + ophalen dmv evaluatie
Waarde zetten/updaten
Aanmelden / bijhouden luisteraars

Bonus: computed

---

Link met framewokrs, change detection, compiler hints ...

---

