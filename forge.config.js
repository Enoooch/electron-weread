const path = require('path')

/**
 * Please note that you can not override the dir, arch, platform, out
 * or electronVersionoptions as they are set by Electron Forge internally
 */
module.exports = {
  packagerConfig: {
    name: 'electron-weread',
    asar: true,
    icon: path.join(__dirname, './public/icons/icon'),
    ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|vite|\/web))|\.gitkeep|config/,
    overwrite: true,
    // arch: 'x64',
    // dir: path.join(__dirname, '../'),
    // out: path.join(__dirname, '../build'),
    // platform: process.env.BUILD_TARGET || 'all',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'electron_weread',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
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
