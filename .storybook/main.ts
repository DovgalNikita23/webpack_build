import path from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5'
import webpack from 'webpack'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@pages': path.resolve(__dirname, '../src/pages'),
      },
    }

    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    ]

    return config
  },
}

export default config
