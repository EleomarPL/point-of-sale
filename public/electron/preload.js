const {contextBridge, ipcRenderer} = require('electron');

const channelsProvider = require('./common/channelsProvider');
const channelsShopping = require('./common/channelsShopping');
const channelsArticle = require('./common/channelsArticle');
const channelsEmployee = require('./common/channelsEmployee');
const channelsSales = require('./common/channelsSales');
const channelsDebts = require('./common/channelsDebts');

const validChannels = [
  ...channelsProvider, ...channelsShopping, ...channelsArticle,
  ...channelsEmployee, ...channelsSales, ...channelsDebts
];

contextBridge.exposeInMainWorld(
  'electron', {
    send: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, callback) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, callback);
      }
    },
    removeAllListeners: (channel) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.removeAllListeners(channel);
      }
    }
  }
);