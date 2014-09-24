
# Retro Text Entry

Add a retor styled text entry to your web app without pain.

## Demo

http://linusu.github.io/retro-text-entry

## Usage

Include the script on your website.

```html
<script src="retro-text-entry.js"></script>
```

And call the only function exposed.

```js

var el = document.querySelector('.type-here');
var opts = { makeUpperCase: true, maxLength: 10 };

retroTextEntry(el, opts, function (input) {
  alert('You wrote: ' + input);
});

```

## API

### `retroTextEntry(el[, opts][, cb])`

Appends a retro text entry to element `el`.

Optionally specify extra options with `opts`. The following keys are valid:

 - `maxLength`: Don't allow more than `maxLength` characters to be entered
 - `makeUpperCase`: Boolean wheter or not to convert text to upper case

The callback `cb` will be called with one parameter, the entered text.

## License

The MIT License (MIT)

Copyright (c) 2014 Linus Unnebäck
