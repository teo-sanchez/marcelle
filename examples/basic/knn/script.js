/* global marcelle */
// import mobilenet from './myMobilenet';

const app = marcelle.createApp({
  title: 'Marcelle Starter',
  author: 'Marcelle Pirates Crew',
  // plugins: [ImagePlugin],
  datasets: ['trainingSet'],
});

const f = marcelle.faker({ size: 3 });
app.use(f);
console.log('f.props.size', f.props.size);
f.out.frames.subscribe((data) => {
  console.log('Fake data:', data);
});

// const b = marcelle.button({ text: 'Say hi!' });
// app.use(b);
// console.log('b.props.text', b.props.text);
// b.out.click.subscribe((v) => {
//   if (!v) return;
//   b.props.text = 'Love on the beat!';
// });

// const w = marcelle.webcam();
// app.use(w);

// setTimeout(() => {
//   w.out.active.set(true);
// }, 3000);
// w.out.active.subscribe((x) => {
//   console.log('w.out.active', x);
// });

// // PIPELINES
// const $input = webcam({ ui: 'webcam' });
// const featureExtractor = img => img
// 	.thru(resize({ width: 224, height: 224, crop: true })
// 	.thru(mobilenet({ version: 2 }));

// const $features = featureExtractor($input);

// const $label = new Stream({ type: String, default: 'a' });

// const $dataCapture = app.dataset('trainingSet')
// 	.capture(
// 		$input.with('features', $features).with('label', $label),
// 		{ ui: 'capture' }
// 	);
// const $dataBrowse = app.dataset('trainingSet')
// 	.browse({ ui: 'trainingSetBrowser' });

// const $viewOne = $dataBrowse.on('instanceSelected')
// 	.instanceViewer();

// const $myViz = app.dataset('trainingSet')
// 	.vizualize({ type: 'tSNE', ui : 'tSNE' });

// const $training = trainingLauncher({})
// 	.withDataset('trainingSet')
// 	.train('mlp');

// const $realTimePrediction = $features.predict('mlp');

// const $selectedInstance = new Stream({ type: String });
// const $onePrediction = $myViz.on('instanceSelected')
// 	.predict('mlp');

// // UI
app.input(f);

// app.dashboard('Data Management').use(b);
// app.page('Data Management').left(w).right(b);

app.start();
