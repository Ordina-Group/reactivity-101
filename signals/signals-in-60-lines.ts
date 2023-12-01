type Subscriber<T> = {
    id: string
    notifySubscriber: (val: T) => void
}

type SignalConfig = Partial<{
    emitInitial: boolean
}>

function generateRandomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

function isEqual(a: any, b: any) {
    return Object.is(a, b)
}

function createSignal<T>(initialValue: T, config?: SignalConfig) {
    let value = initialValue
    let subscribers: Subscriber<T>[] = []

    const updateValue = (newValue: T) => {
        // only emit when value is different
        if (isEqual(newValue, value)) {
            return
        }

        value = newValue
        subscribers.forEach(s => s.notifySubscriber(newValue))
    }
    
    const addSubscriber = (notifySubscriber: (v: T) => void) => {
        const id = generateRandomId()
        subscribers.push({
            id,
            notifySubscriber
        })

        if (config?.emitInitial) {
            notifySubscriber(value)
        }

        return {
            unsubscribe: () => {
                subscribers = subscribers.filter(s => s.id !== id)
            }
        }
    }

    return {
        value: () => value, // <- has to be a function otherwise the ref is not updated - TODO: try class with getter instead?
        set: updateValue,
        subscribe: addSubscriber
    }
}

const val = createSignal('Test', { emitInitial: true })
const signal$ = val.subscribe(console.log)

val.set('Test2')

setTimeout(() => {
    val.set('Test4')
}, 5000)
