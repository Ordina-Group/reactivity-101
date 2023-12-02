---
title: 'Bing bong'
---

# Reactivity 101

---

What is Reactivity?

Note: What is reactivity? What is reactive programming?

----

```js
var count = 0;

function render() {
	document.getElementById("counter").innerHTML = count;
}

document.getElementById("counterPlus").addEventListener('click', () => {
	count = count + 1;
	render(); // <--- This here.
})
``

Note: Regular variable being updated on click.

```html
<div>
	<span class="counter"></span>
	
	<button class="counterPlus">+</button>
</div>
```

---

// Show "Reactive" example, using Signals??

---

