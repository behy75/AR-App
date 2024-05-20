/**
 * Instructions for running the React Native app:
 *
 * 1. To start the development server, run:
 *    npm start
 *
 * 2. To run the app on an Android device or emulator, run:
 *    npm run android
 *
 * Note: Make sure to check your network proxy settings if you encounter issues downloading
 * node_modules and Gradle files during the development process.
 *
 * If the 'app' object inside 'InitialScene' is not correctly changed, you can use 'useRef'
 * instead of 'useState'.
 *
 * @param {Vector3} newPosition - The new position for the object.
 * @returns {void}
 */
const moveObject = (newPosition: Vector3) => {
  setPosition(newPosition);
};

/**
 * Rotate the object based on the given rotation state and rotation factor.
 *
 * @param {number} rotateState - The rotation state.
 * @param {number} rotationFactor - The rotation factor.
 * @returns {void}
 */
const rotateObject = (rotateState: number, rotationFactor: number) => {
  if (rotateState === 3) {
    let currentRotation: Vector3 = [
      rotation[0] - rotationFactor,
      rotation[1] - rotationFactor,
      rotation[2] - rotationFactor,
    ];
    setRotation(currentRotation);
  }
};

/**
 * Scale the chair object based on the given pinch state and scale factor.
 *
 * @param {number} pinchState - The pinch state.
 * @param {number} scaleFactor - The scale factor.
 * @returns {void}
 */
const scaleChairObject = (pinchState: number, scaleFactor: number) => {
  if (pinchState === 3) {
    let currentScale = chairAndTableScale[0];
    let newScale = currentScale * scaleFactor;
    let newScaleArray: Vector3 = [newScale, newScale, newScale];
    setChairScale(newScaleArray);
  }
};

/**
 * Scale the chair and table object based on the given pinch state and scale factor.
 *
 * @param {number} pinchState - The pinch state.
 * @param {number} scaleFactor - The scale factor.
 * @returns {void}
 */
const scaleChairAndTableObject = (pinchState: number, scaleFactor: number) => {
  if (pinchState === 3) {
    let currentScale = chairAndTableScale[0];
    let newScale = currentScale * scaleFactor;
    let newScaleArray: Vector3 = [newScale, newScale, newScale];
    setChairAndTableScale(newScaleArray);
  }
};
