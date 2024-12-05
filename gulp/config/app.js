import notify from 'gulp-notify'

const isProd = process.argv.includes('--production')
const isDev = !isProd

function showNotify(problemName) {
  return {
    errorHandler: notify.onError(error => ({
      title: problemName,
      message: error.message,
    })),
  }
}

const app = {
  isProd: isProd,
  isDev: isDev,

  typograf: {
    locale: ['ru', 'en-US'],
  },

  htmlmin: {
    collapseWhitespace: isProd,
  },

  pug: {
    pretty: isDev,
  },

  autoprefixer: {
    cascade: false,
    grid: true,
  },

  imageAvif: {
    quality: 50,
  },

  imageWebp: {
    quality: 80,
  },

  imageMinGif: {
    interlaced: true,
  },

  imageMinJpeg: {
    quality: 80,
    progressive: true,
  },

  imageMinPng: {
    optimizationLevel: 2,
  },

  imageMinSvg: {
    js2svg: { indent: 2, pretty: true },
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
      {
        name: 'cleanupIDs',
        active: false,
      },
    ],
  },

  sprite: {
    mode: {
      symbol: {
        sprite: '../sprite.svg',
        example: isProd,
      },
    },
    shape: {
      transform: [
        {
          svgo: {
            js2svg: { indent: 4, pretty: true },
            plugins: [
              {
                name: 'removeAttrs',
                params: {
                  attrs: '(fill|stroke)',
                },
              },
            ],
          },
        },
      ],
    },
  },

  babel: {
    presets: ['@babel/env'],
  },

  webpack: {
    mode: isProd ? 'production' : 'development',
    entry: {
      index: './src/scripts/index.js',
      // about: './src/scripts/about.js' // Example for adding more page
    },
    output: {
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
}

export { app, showNotify }
