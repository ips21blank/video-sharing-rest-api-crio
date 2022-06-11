const path = require('path');

module.exports = {
  '@tsTypes': path.resolve(__dirname, 'src/types/index.ts'),
  '@models': path.resolve(__dirname, 'src/models/index.ts'),
  '@middlewares': path.resolve(__dirname, 'src/middlewares/index.ts'),
  '@routes': path.resolve(__dirname, 'src/routes/index.ts'),
  '@controllers': path.resolve(__dirname, 'src/controllers/index.ts'),
  '@services': path.resolve(__dirname, 'src/services/index.ts'),
  '@errors': path.resolve(__dirname, 'src/errors/index.ts')
};
