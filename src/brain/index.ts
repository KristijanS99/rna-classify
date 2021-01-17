import * as brain from 'brain.js';
import {writeFileSync, readFileSync, existsSync} from 'fs';

const net = new brain.recurrent.LSTM();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let trainedBrain : any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startTraining = async ():Promise<boolean> => {
  net.train([
    {input: 'Feeling good.', output: 'positive'},
    {input: 'Overall well.', output: 'positive'},
    {input: 'Extremely happy.', output: 'positive'},
    {input: 'I\'m feeling joyful.', output: 'positive'},
    {input: 'She is in an outstanding mood.', output: 'positive'},
    {input: 'He is feeling inspiration', output: 'positive'},
    {input: 'Today will be my day.', output: 'positive'},
    {input: 'I know that I’m winner.', output: 'positive'},
    {input: 'Yes ,I can do it, I know I can.', output: 'positive'},
    {input: 'Tomorrow is next chance.', output: 'positive'},
    {input: 'Henna can do it.', output: 'positive'},
    {input: 'I like vegetables.', output: 'positive'},
    {input: 'I\'m feeling worse than ever.', output: 'negative'},
    {input: 'She seems a little distracted.', output: 'negative'},
    {input: 'This behaviour is unacceptable.', output: 'negative'},
    {input: 'Rober is feeling depressed.', output: 'negative'},
    {input: 'They are feeling miserable.', output: 'negative'},
    {input: 'Robert is in bad mood.', output: 'negative'},
    {input: 'I\'m feeling pity for m action.', output: 'negative'},
  ], {
    // Defaults values --> expected validation
    iterations: 20000, // the maximum times to iterate the training data
    errorThresh: 0.005, // the acceptable error percentage from training data
    log: true, // true to use console.log
    logPeriod: 10, // iterations between logging out --> number greater than 0
    learningRate: 0.3, // scales with delta to effect training rate
    momentum: 0.1, // scales with next layer's change value
    callbackPeriod: 10, // the number of iterations between callback calls
    timeout: Infinity, // the max number of milliseconds to train for
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
