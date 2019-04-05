# DogRain

For when you site simply must rain random images of dogs every now and then. This project was made possible by [PlaceDog.net](https://placedog.net/)!

## Basic Usage

Include DogRain script in your footer and add the `dograin` class to any element that you'd like to trigger the puppers.

```
<!-- Add `dograin` class to element -->
<button type="button" class="dograin">Bring on the Dogs</button>

<!-- Include DogRain script -->
<script src="/path/to/dograin/dist/dograin.js"></script>
```

## Library Usage

You can use DogRain in your ES6+ scripts like the following:

```
import DogRain from 'dograin'

const dogRain = new DogRain()

// Bring on the Dogs
dogRain.start()

// Back to normal
dogRain.stop()
```
