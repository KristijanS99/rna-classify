import * as brain from 'brain.js';
import {writeFileSync, readFileSync, existsSync} from 'fs';

const net = new brain.recurrent.LSTM();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let trainedBrain : any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startTraining = async ():Promise<boolean> => {
  net.train([
    {input: 'my unit-tests failed.', output: 'software'},
    {input: 'tried the program, but it was buggy.', output: 'software'},
    {input: 'i need a new power supply.', output: 'hardware'},
    {input: 'the drive has a 2TB capacity.', output: 'hardware'},
    // added for less overfitting
    {input: 'unit-tests', output: 'software'},
    {input: 'program', output: 'software'},
    {input: 'power supply', output: 'hardware'},
    {input: 'drive', output: 'hardware'},
  ], {
    // Defaults values --> expected validation
    iterations: 20000, // the maximum times to iterate the training data
    errorThresh: 0.05, // the acceptable error percentage from training data
    log: true, // true to use console.log
    logPeriod: 10, // iterations between logging out --> number greater than 0
  });
  const json = net.toJSON();
  const data = JSON.stringify(json);
  writeFileSync('trainingdata.json', data);
  return true;
};

export const loadBrain = ():void => {
  const savedNet = readFileSync('trainingdata.json');
  const data = JSON.parse(savedNet.toString());
  const net = new brain.recurrent.LSTM();
  net.fromJSON(data);
  trainedBrain = net;
};

export const classify = (input:string):string => {
  if (!trainedBrain) {
    loadBrain();
  }
  const result:string = net.run(input);
  return result;
};

export const netExists = ():boolean => {
  // Check if network has been trainer previously
  if (!existsSync('trainingdata.json')) {
    return false;
  }
  return true;
};
