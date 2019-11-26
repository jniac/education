// https://github.com/jniac/js-events

var events = (function (exports) {
	'use strict';

	const defineProperties = (target, options, props) => {

	    let { enumerable = true, configurable = false, writable = true } = options || {};

	    for (let [key, value] of Object.entries(props)) {

	        Object.defineProperty(target, key, { value, enumerable, configurable });

	    }

	};

	// NOTE: map could be a WeakMap... when debugging will be done!
	let map = new Map();

	const ensure = (target) => {

	    let listener = map.get(target);

	    if (!listener) {

	        listener = {

	            target,
	            array: [],

	        };

	        map.set(target, listener);

	    }

	    return listener

	};

	const on = (target, eventType, callback, props = null) => {

	    let listener = ensure(target);

	    listener.array.push({

	        eventType,
	        callback,
	        ...props,

	    });

	};

	const off = (target, eventType, callback, props = null) => {

	    let listener = map.get(target);

	    if (!listener)
	        return

	    let entries = props ? Object.entries(props) : [];

	    let { array } = listener;

	    for (let bundle, i = 0; bundle = array[i]; i++) {

	        let match =
	            (eventType === true || eventType === 'all' || String(eventType) === String(bundle.eventType))
	            && (!callback || callback === bundle.callback)
	            && entries.every(([key, value]) => bundle[key] === value);

	        if (match) {

	            array.splice(i, 1);
	            i--;

	        }

	    }

	    if (array.length === 0) {

	        map.delete(target);

	    }

	};

	const once = (target, eventType, callback, props = null) => {

	    let onceCallback = function(...args) {

	        off(target, eventType, onceCallback, props);

	        callback.call(target, ...args);

	    };

	    on(target, eventType, onceCallback, props);

	};

	// const makeEvent = (target, type, { cancelable = true, ...eventProps } = {}) => {
	//
	//     let canceled = false
	//     let cancel = cancelable ? () => canceled = true : () => {}
	//
	//     return {
	//
	//         ...eventProps,
	//         target,
	//         currentTarget: target,
	//         type,
	//         cancel,
	//         get cancelable() { return cancelable },
	//         get canceled() { return canceled },
	//
	//     }
	//
	// }
	//
	// const cloneEvent = (event, currentTarget) => {
	//
	//     let {
	//         target,
	//         type,
	//         cancelable,
	//         ...eventProps
	//     } = event
	//
	//     let canceled = false
	//     let cancel = cancelable ? () => canceled = true : () => {}
	//
	//     return {
	//
	//         ...eventProps,
	//         target,
	//         currentTarget,
	//         type,
	//         cancel,
	//         get cancelable() { return cancelable },
	//         get canceled() { return canceled },
	//
	//     }
	//
	// }

	class Event {

	    constructor(target, type, { cancelable = true, ...props } = {}) {

	        defineProperties(this, { enumerable:false }, {

	            type,
	            target,

	        });

	        defineProperties(this, { enumerable:false, configurable:true }, {

	            currentTarget: target,
	            canceled: false,

	        });

	        // enumerable props (important for cloning)
	        defineProperties(this, { enumerable:true }, {

	            cancelable,
	            ...props,

	        });

	    }

	    cancel() {

	        if (this.cancelable)
	            defineProperties(this, { enumerable:false }, { canceled:true });

	    }

	    clone(currentTarget) {

	        let { target, type, ...props } = this;

	        let event = new Event(target, type, props);

	        defineProperties(event, { enumerable:false }, { currentTarget });

	        return event

	    }

	}

	const propagate = (event) => {

	    let result = event.propagate(event.currentTarget);

	    if (!result)
	        return

	    let array = typeof result[Symbol.iterator] === 'function' ? result : [result];

	    for (let target of array) {

	        if (target) {

	            fireEvent(event.clone(target));

	        }

	    }

	};

	const fire = (target, eventType, eventProps) => {

	    let array = eventType.split(/\s*,\s*|\s+/);

	    if (array.length > 1) {

	        for (let eventType of array) {

	            fire(target, eventType, eventProps);

	        }

	        return

	    }

	    if (!map.has(target) && (!eventProps || !eventProps.propagate))
	        return

	    // let event = makeEvent(target, eventType, eventProps)
	    let event = new Event(target, eventType, eventProps);

	    fireEvent(event);

	};

	const fireEvent = (event) => {

	    let listener = map.get(event.currentTarget);

	    if (!listener) {

	        if (event.propagate) {

	            propagate(event);

	        }

	        return

	    }

	    for (let { eventType, callback } of [...listener.array]) {

	        let match = false;

	        if (eventType === '*') {

	            match = true;

	        } else if (typeof eventType === 'string') {

	            match = eventType === event.type;

	        } else if (eventType instanceof RegExp) {

	            match = eventType.test(event.type);

	        }

	        if (match) {

	            callback.call(event.currentTarget, event);

	            if (event.canceled) {

	                return

	            }

	        }

	    }

	    if (event.propagate) {

	        propagate(event);

	    }

	};

	const makeDispatcher = (target) => {

	    defineProperties(target, { enumerable:false }, {

	        // NOTE: be carefull method signatures should match precisely global method signatures

	        on: function(eventType, callback, props = null) {

	            on(this, eventType, callback, props = null);

	            return this

	        },

	        off: function(eventType, callback, props = null) {

	            off(this, eventType, callback, props = null);

	            return this

	        },

	        once: function(eventType, callback, props = null) {

	            once(this, eventType, callback, props = null);

	            return this

	        },

	        fire: function(eventType, eventProps) {

	            fire(this, eventType, eventProps);

	            return this

	        },

	        debugGetListener: function() {

	            return map.get(this)

	        },

	    });

	    return target

	};

	const debugGetCount = () => {

	    let count = 0;

	    for (let { array } of map.values()) {

	        count += array.length;

	    }

	    return count

	};

	var events = {

	    on,
	    off,
	    once,
	    fire,
	    makeDispatcher,
	    Event,

	    // TEMP: for debugging
	    map,
	    debugGetCount,

	};

	exports.on = on;
	exports.off = off;
	exports.once = once;
	exports.fire = fire;
	exports.makeDispatcher = makeDispatcher;
	exports.Event = Event;
	exports.map = map;
	exports.debugGetCount = debugGetCount;
	exports.default = events;

	return exports;

}({}));
