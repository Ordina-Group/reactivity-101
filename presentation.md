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
var count = 0;

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
// Pseudo-future Angular
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

----

### But what does a Signal do then?

Note: Let's discuss what a Signal does. How the API's differ perhaps?

---

kernwoorden hoofdstukjes

---

pros en cons beschrijven, jatten uit rxjs
