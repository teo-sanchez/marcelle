/* global marcelle mostCore */

const w = marcelle.webcam();

const cap = marcelle.capture({ input: w.$images, thumbnail: w.$thumbnails });
const mobilenet = marcelle.mobilenet();
const instances = marcelle.createStream(
  mostCore.awaitPromises(
    mostCore.map(
      async (instance) => ({
        ...instance,
        type: 'image',
        features: await mobilenet.process(instance.data),
      }),
      cap.$instances,
    ),
  ),
);
const trainingSet = marcelle.dataset({ name: 'TrainingSet' });
trainingSet.capture(instances);

const b = marcelle.button({ text: 'Train' });
const classifier = marcelle.mlp({ layers: [128, 64], epochs: 30 });
b.$click.subscribe(() => classifier.train(trainingSet));
classifier.$training.subscribe(console.log);

const tog = marcelle.toggle({ text: 'toggle prediction' });

// ////////////////////////
const d = document.createElement('h2');
document.querySelector('#app').appendChild(d);
d.innerText = 'Waiting for predictions...';
// ////////////////////////

const results = marcelle.text({ text: 'waiting for predictions...' });
// eslint-disable-next-line @typescript-eslint/no-empty-function
let predictions = { stop() {} };
tog.$checked.subscribe((x) => {
  if (x) {
    predictions = marcelle.createStream(
      mostCore.awaitPromises(
        mostCore.map(async (img) => classifier.predict(await mobilenet.process(img)), w.$images),
      ),
    );
    predictions.subscribe((y) => {
      d.innerText = `predicted label: ${y.label}`;
      results.$text.set(
        `<h2>predicted label: ${y.label}</h2><p>Confidences: ${Object.values(y.confidences)}</p>`,
      );
    });
  } else {
    predictions.stop();
  }
});

const app = marcelle.createApp({
  title: 'Marcelle Starter',
  author: 'Marcelle Pirates Crew',
});

app.dashboard('Data Management').useLeft(w, mobilenet).use(cap, trainingSet);
app.dashboard('Training').use(marcelle.parameters(classifier), b);
app.dashboard('Real-time prediction').useLeft(w).use(tog, results);

app.start();
