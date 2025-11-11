import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Tasks'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectiontitle}>Today's Tasks</Text>

        <View style={styles.items}>
          <Task text={'Task 1'}></Task>
          <Task text={'Task 2'}></Task>
          <Task text={'Task 3'}></Task>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',

  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal:20,
  },
  sectiontitle: {
    fonstSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
});
