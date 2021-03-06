/**
 * Source code: https://github.com/fal-works/p5js-snippets/
 * @copyright 2019 FAL
 */

"use strict";

// ---- definition for random functions ----------------------------------------------------------------

/**
 * Creates a collection of functions that return random values.
 *
 * @example
 * const Random = createRandomFunctions();
 * // Now you can use each function in `Random`.
 * const myValue = Random.value(10);
 * const myInt = Random.Integer.between(10, 20);
 *
 * @param random - A function that returns a random value from `0` up to (but not including) `1`.
 *   Defaults fo `Math.random`.
 * @returns Functions that return random values.
 */
const createRandomFunctions = (random = Math.random) => {
  const {
    floor,
    PI
  } = Math;
  const TWO_PI = 2 * PI;

  return {
    /**
     * Returns a random value from `0` to (but not including) `1`.
     * @returns A random ratio.
     */
    ratio: random,

    /**
     * Returns a random value from `0` to (but not including) `value`.
     * @param max
     * @returns A random value.
     */
    value: max => random() * max,

    /**
     * Returns a random value from `min` up to (but not including) `max`.
     * The case where `min > max` is not expected.
     * @param min
     * @param max
     * @returns A random integer value.
     */
    between: (min, max) => min + random() * (max - min),

    /**
     * Returns a random value from `0` to (but not including) `2 * PI`.
     * @returns A random radians value.
     */
    angle: () => random() * TWO_PI,

    /**
     * Returns `1` or `-1` randomly.
     * @param positiveProbability A number between 0 and 1 for the probability of a positive value being returned.
     * @returns Either `1` or `-1`.
     */
    sign: positiveProbability => (random() < positiveProbability ? 1 : -1),

    /**
     * Returns `true` or `false` randomly.
     * @param probability A number between 0 and 1 for the probability of `true` being returned.
     * @returns `true` with the given `probability`.
     */
    bool: probability => random() < probability,

    /**
     * Returns a positive or negative value randomly with a magnitude from `0` up to (but not including) `maxMagnitude`.
     * @param maxMagnitude
     * @returns A random value.
     */
    signed: maxMagnitude => (random() < 0.5 ? 1 : -1) * random() * maxMagnitude,

    /**
     * Returns a positive or negative value randomly with a magnitude from `0` up to (but not including) `PI`.
     * @returns A random radians value.
     */
    signedAngle: () => (random() < 0.5 ? 1 : -1) * random() * PI,

    /** Collection of functions that return random integer values. */
    Integer: {
      /**
       * Returns a random integer from 0 up to (but not including) `maxInt`.
       * `maxInt` is not expected to be negative.
       * @param maxInt
       * @returns A random integer value.
       */
      value: maxInt => floor(random() * maxInt),

      /**
       * Returns a random integer from `minInt` up to (but not including) `maxInt`.
       * The case where `minInt > maxInt` is not expected.
       * @param minInt
       * @param maxInt
       * @returns A random integer value.
       */
      between: (minInt, maxInt) => minInt + floor(random() * (maxInt - minInt)),

      /**
       * Returns a positive or negative integer randomly
       * with a magnitude from `0` up to (but not including) `maxMagnitude`.
       * @param maxMagnitude
       * @returns A random signed value.
       */
      signed: maxMagnitude =>
        (random() < 0.5 ? 1 : -1) * floor(random() * maxMagnitude)
    },

    /** Collection of functions that return random discrete values. */
    Discrete: {
      /**
       * Returns a random value at intervals of `step` from `0` up to (but not including) `1`.
       * @param step - E.g. if `0.25`, the result is either `0`, `0.25`, `0.5` or `0.75`.
       * @returns A random value.
       */
      ratio: step => floor(random() / step) * step,

      /**
       * Returns a random value at intervals of `step` from `0` up to (but not including) `max`.
       * @param step
       * @param max
       * @returns A random value.
       */
      value: (step, max) => floor(random() * (max / step)) * step,

      /**
       * Returns a random value at intervals of `step` from `min` up to (but not including) `max`.
       * @param step
       * @param min
       * @param max
       * @returns A random value.
       */
      between: (step, min, max) =>
        min + floor(random() * ((max - min) / step)) * step,

      /**
       * Returns a positive or negative value randomly at intervals of `step`
       * with a magnitude from `0` up to (but not including) `maxMagnitude`.
       * @param step
       * @param maxMagnitude
       * @returns A random signed value.
       */
      signed: (step, maxMagnitude) =>
        (random() < 0.5 ? 1 : -1) *
        floor(random() * (maxMagnitude / step)) *
        step,

      /**
       * Returns a random value at intervals of `step` from `0` to (but not including) `2 * PI`.
       * @param step - Interval angle.
       * @returns A random radians value.
       */
      angle: step => floor(random() * (TWO_PI / step)) * step,

      /**
       * Returns a positive or negative value randomly at intervals of `step`
       * with a magnitude from `0` up to (but not including) `PI`.
       * @param step - Interval angle.
       * @returns A random signed radians value.
       */
      signedAngle: step =>
        (random() < 0.5 ? 1 : -1) * floor(random() * (PI / step)) * step
    },

    /** Collection of functions that return random elements from an array. */
    Array: {
      /**
       * Returns one element from `array` randomly.
       * `array` is not expected to be empty.
       * @param array
       * @returns A random element.
       */
      get: array => array[floor(random() * array.length)],

      /**
       * Removes and returns one element from `array` randomly.
       * `array` is not expected to be empty.
       * @param array
       * @returns A random element.
       */
      removeGet: array => array.splice(floor(random() * array.length), 1)[0]
    },

    /** Collection of functions that return random values. */
    Curved: {
      /**
       * Similar to the normal `ratio()`, but remaps the result by `curve`.
       * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
       * @returns A random value.
       */
      ratio: curve => curve(random()),

      /**
       * Similar to the normal `value()`, but remaps the result by `curve`.
       * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
       * @param magnitude
       * @returns A random value.
       */
      value: (curve, magnitude) => curve(random()) * magnitude,

      /**
       * Similar to the normal `between()`, but remaps the result by `curve`.
       * `start` should not be greater than `end`.
       * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
       * @param start
       * @param end
       * @returns A random value.
       */
      between: (curve, start, end) => start + curve(random()) * (end - start),

      /**
       * Similar to the normal `angle()`, but remaps the result by `curve`.
       * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
       * @returns A random radians value.
       */
      angle: curve => curve(random()) * TWO_PI,

      /**
       * Similar to the normal `signed()`, but remaps the result by `curve`.
       * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
       * @param magnitude
       * @returns A random signed value.
       */
      signed: (curve, magnitude) =>
        (random() < 0.5 ? 1 : -1) * curve(random()) * magnitude,

      /**
       * Similar to the normal `signedAngle()`, but remaps the result by `curve`.
       * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
       * @param magnitude
       * @returns A random signed radians value.
       */
      signedAngle: curve => (random() < 0.5 ? 1 : -1) * curve(random()) * PI
    },

    /** Collection of functions that return random 2-dimensional `p5.Vector` instances. */
    P5Vector2D: {
      /**
       * Returns a unit vector with a random angle.
       * This is just an alias of `p5.Vector.random2D`.
       * @returns A random 2D `p5.Vector` instance.
       */
      unit: p5.Vector.random2D,

      /**
       * Returns a 2D `p5.Vector` instance with `length` and a random angle.
       * @param length
       * @returns A random 2D `p5.Vector` instance.
       */
      withLength: length => p5.Vector.random2D().mult(length)
    }
  };
};


// ---- example sketch -------------------------------------------------------------------------------------------

// -- common ----

const Random = createRandomFunctions();
const pow2 = x => x * x;
const pow4 = x => pow2(pow2(x));

let radioButton;

const getAngleRange = (directionAngle, centralAngle) => {
  const halfCentralAngle = centralAngle / 2;

  return {
    start: directionAngle - halfCentralAngle,
    end: directionAngle + halfCentralAngle
  };
};

// -- modes ----

const defaultRandomMode = {
  sizeFactor: Random.ratio,
  angles: () => ({
    start: Random.angle(),
    end: Random.angle()
  }),
  repetition: 16
};

const randomModes = new Map();
randomModes.set("default", defaultRandomMode);
randomModes.set("discrete", {
  sizeFactor: () => Random.Discrete.ratio(0.1),
  angles: () => ({
    start: Random.Discrete.angle(QUARTER_PI),
    end: Random.Discrete.angle(QUARTER_PI)
  }),
  repetition: 16
});
randomModes.set("fan", {
  sizeFactor: Random.ratio,
  angles: () => {
    const directionAngle = Random.Discrete.angle(HALF_PI);
    const centralAngle = Random.value(HALF_PI);
    return getAngleRange(directionAngle, centralAngle);
  },
  repetition: 32
});
randomModes.set("curved", {
  sizeFactor: () => Random.Curved.ratio(pow2),
  angles: () => {
    const directionAngle = Random.angle();
    const centralAngle = Random.Curved.angle(pow4);
    return getAngleRange(directionAngle, centralAngle);
  },
  repetition: 32
});

// -- drawing functions ----

const drawRandomPie = randomMode => {
  const diameter = 100 + randomMode.sizeFactor() * 460;
  const {
    start,
    end
  } = randomMode.angles();
  arc(0, 0, diameter, diameter, start, end, PIE);
};

const drawObject = () => {
  push();
  background(0, 0, 0.98);

  blendMode(BURN);
  fill(random(360), 0.3, 0.65);
  translate(width / 2, height / 2);

  const mode = randomModes.get(radioButton.value()) || defaultRandomMode;

  for (let i = 0, len = mode.repetition; i < len; i += 1) drawRandomPie(mode);

  pop();
};

const drawAlphaBackground = () => {
  fill(0, 0, 1, 0.1);
  rect(0, 0, width, height);
};

// -- main ----

function setup() {
  createCanvas(640, 640);
  noStroke();
  colorMode(HSB, 360, 1, 1, 1);

  radioButton = createRadio();
  for (const key of randomModes.keys()) radioButton.option(key);
  radioButton.position(20, 20);
  radioButton.value("default");

  drawObject();
}

function draw() {
  const count = frameCount % 120;

  if (count === 0) drawObject();
  else if (count > 75) drawAlphaBackground();
}