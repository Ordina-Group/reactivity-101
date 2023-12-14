---
title: 'Bing bong'
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
 
Note: Regular variable being updated on click.

```html
<div>
	<span class="counter"></span>
	
	<button class="counterPlus">+</button>
</div>
```

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

### But what does a Signal do then?

Note: Let's discuss what a Signal does. How the API's differ perhaps?