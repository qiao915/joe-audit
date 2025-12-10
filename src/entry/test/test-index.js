import { auditPackage } from '../index.js';

auditPackage(
  `/Users/yuanjin/Desktop/my-site`,
  `/Users/yuanjin/Desktop/my-site.md`
).then(() => {
  console.log('Local project audit completed');
});

// auditPackage(
//   `https://github.com/webpack/webpack-dev-server/tree/v4.9.3`,
//   `/Users/yuanjin/Desktop/webpack-dev-server_4_9_3.md`
// ).then(() => {
//   console.log('Remote project audit completed');
// });
