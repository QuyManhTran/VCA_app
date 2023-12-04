// metro.config.js
// khi có file này thì trong project có file nào thì phải khai báo trong này
module.exports = {
    resolver: {
      sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs', 'ttf', 'mp3'],
      assetExts: ['glb', 'gltf', 'png', 'jpg', 'ttf', 'mp3'],
    },
  }