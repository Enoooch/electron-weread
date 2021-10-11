const path = require('path')

module.exports = {
  packagerConfig: {
    name: 'weread',
    arch: 'x64',
    // arch: 'ia32',
    asar: false,
    dir: path.join(__dirname, '../'),
    icon: path.join(__dirname, '../build/icons/icon'),
    ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|vite|\/web))|\.gitkeep|config/,
    out: path.join(__dirname, '../build'),
    overwrite: true,
    platform: process.env.BUILD_TARGET || 'all',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'electron_weread',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
}
