import * as brain from 'brain.js';
import {writeFileSync, readFileSync, existsSync} from 'fs';
import client, {q} from '../faunadb';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let net : any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startTraining = async (): Promise<boolean> => {
  // Get all sequences from DB
  try {
    const sequences:Result = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('RNA'))),
            q.Lambda((x) => q.Get(x)),
        ),
    );

    const harmfulSeq: Array<any> = sequences.data.reduce(function(acc, curr) {
      if (curr.data.type === '1') {
        acc.push({
          input: curr.data.sequence,
          output: 'harmful',
        });
      };
      return acc;
    }, []);

    const notHarmfulSeq:Array<any> = sequences.data.reduce(function(acc, curr) {
      if (curr.data.type === '0') {
        acc.push({
          input: curr.data.sequence,
          output: 'unharmful',
        });
      };
      return acc;
    }, []);

    loadBrain();

    net.train([...harmfulSeq, ...notHarmfulSeq], {
    // Defaults values --> expected validation
      iterations: 500, // the maximum times to iterate the training data
      errorThresh: 0.035, // the acceptable error percentage from training data
      log: true, // true to use console.log
      logPeriod: 1, // iterations between logging out --> number greater than 0
    });

    const json = net.toJSON();
    const data = JSON.stringify(json);
    writeFileSync('trainingdata.json', data);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const loadBrain = (): void => {
  if (netExists()) {
    const savedNet = readFileSync('trainingdata.json');
    const data = JSON.parse(savedNet.toString());
    const newNet = new brain.recurrent.LSTM();
    newNet.fromJSON(data);
    net = newNet;
  } else {
    net = new brain.recurrent.LSTM();
  }
};

export const classify = (input:string):string => {
  if (!netExists()) {
    return 'NaN';
  };
  if (!net) {
    loadBrain();
  }
  const result:string = net.run(input);
  return result;
};

export const netExists = ():boolean => {
  // Check if network has been trained previously
  if (!existsSync('trainingdata.json')) {
    return false;
  }
  return true;
};

interface Result {
    data: Array<any>,
}

