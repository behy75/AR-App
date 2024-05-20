import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';

type Vector3 = [number, number, number];

const InitialScene = (props: { sceneNavigator: { object: string } }) => {
  const { object } = props.sceneNavigator;
  const [position, setPosition] = useState<Vector3>([0, 0, -5]);
  const [rotation, setRotation] = useState<Vector3>([0, 0, 0]);
  const [chairScale, setChairScale] = useState<Vector3>([0.3, 0.3, 0.3]);
  const [chairAndTableScale, setChairAndTableScale] = useState<Vector3>([
    0.009, 0.009, 0.009,
  ]);

  // Material and Animation Registration
  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require('./assets/wood.jpeg'),
    },
  });

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90',
      },
    },
  });

  const moveObject = (newPosition: Vector3) => {
    setPosition(newPosition);
  };

  const rotateObject = (
    rotateState: number,
    rotationFactor: number
    // source: any,
  ) => {
    if (rotateState === 3) {
      let currentRotation: Vector3 = [
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ];
      setRotation(currentRotation);
    }
  };

  const scaleChairObject = (
    pinchState: number,
    scaleFactor: number
    // source: any,
  ) => {
    if (pinchState === 3) {
      let currentScale = chairAndTableScale[0]; // Assuming chairAndTableScale is a Vector3 array
      let newScale = currentScale * scaleFactor; // Assuming scaleFactor is a scalar
      let newScaleArray: Vector3 = [newScale, newScale, newScale]; // Assuming Vector3 is defined elsewhere
      setChairScale(newScaleArray); // Assuming setChairAndTableScale is the setter function for chairAndTableScale state
    }
  };

  const scaleChairAndTableObject = (
    pinchState: number,
    scaleFactor: number
    // source: any,
  ) => {
    if (pinchState === 3) {
      let currentScale = chairAndTableScale[0]; // Assuming chairAndTableScale is a Vector3 array
      let newScale = currentScale * scaleFactor; // Assuming scaleFactor is a scalar
      let newScaleArray: Vector3 = [newScale, newScale, newScale]; // Assuming Vector3 is defined elsewhere
      setChairAndTableScale(newScaleArray); // Assuming setChairAndTableScale is the setter function for chairAndTableScale state
    }
  };

  // Rendering
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      {object === 'chair' ? (
        <Viro3DObject
          source={require('./assets/chair/chair.obj')}
          resources={[require('./assets/chair/chair.mtl')]}
          position={position}
          scale={chairScale}
          materials={['wood']}
          rotation={rotation}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
          onPinch={scaleChairObject}
        />
      ) : (
        <Viro3DObject
          source={require('./assets/chair-and-table/chair-and-table.obj')}
          position={position}
          scale={chairAndTableScale}
          materials={['wood']}
          rotation={rotation}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
          onPinch={scaleChairAndTableObject}
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  const [object, setObject] = useState('chairAndTable');

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          // eslint-disable-next-line react/no-unstable-nested-components
          scene: () => <InitialScene sceneNavigator={{ object }} />,
        }}
        viroAppProps={{ object }}
        style={styles.f1}
      />

      <View style={styles.controlsView}>
        <TouchableOpacity onPress={() => setObject('chairAndTable')}>
          <Text style={styles.text}>Display Chair And Table</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setObject('chair')}>
          <Text style={styles.text}>Display Chair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  mainView: { flex: 1 },
  controlsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
  },
  text: {
    padding: 10,
    margin: 20,
    backgroundColor: '#9d9d9d',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
