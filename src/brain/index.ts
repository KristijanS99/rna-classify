import * as brain from 'brain.js';
import { writeFileSync } from 'fs';

const net = new brain.recurrent.LSTM();
net.train([
  {input: "Feeling good.", output: "positive"},
  {input: "Overall well.", output: "positive"},
  {input: "Extremely happy.", output: "positive"},
  {input: "I'm feeling joyful.", output: "positive"},
  {input: "She is in an outstanding mood.", output: "positive"},
  {input: "He is feeling inspiration", output: "positive"},  
  {input: "Today will be my day.", output: "positive"},
  {input: "I know that I’m winner.", output: "positive"},
  {input: "Yes ,I can do it, I know I can.", output: "positive"},
  {input: "Tomorrow is next chance.", output: "positive"},
  {input: "Henna can do it.", output: "positive"},
  {input: "I like vegetables.", output: "positive"},
  {input: "I'm feeling worse than ever.", output: "negative"},
  {input: "She seems a little distracted.", output: "negative"},
  {input: "This behaviour is unacceptable.", output: "negative"},
  {input: "Rober is feeling depressed.", output: "negative"},
  {input: "They are feeling miserable.", output: "negative"},
  {input: "Robert is in bad mood.", output: "negative"},
  {input: "I'm feeling pity for m action.", output: "negative"}
],{});
const json = net.toJSON()
const data = JSON.stringify(json);
writeFileSync('trainingdata.json', data)
