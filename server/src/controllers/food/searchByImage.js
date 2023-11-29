const tf = require("@tensorflow/tfjs-node");
const Jimp = require('jimp');
const food = require("../../models/food/food");


const MODEL_DIR_PATH = `${__dirname}`;
const IMAGE_FILE_PATH = 'http://localhost:3000/public//images/comtam.jpg';
const BASE_PROBABILITY = 0.1;

function isImage(path) {
    const validExtensions = ['.png', '.jpg', '.jpeg'];
    const fileExtension = path.toLowerCase().substr(path.lastIndexOf('.'));
    return validExtensions.includes(fileExtension);
}

const searchByImage = async (req, res) => {
    const { path } = req.file;

    if (!isImage(path)) {
        return res.status(400).json(
            {
                text: "Không đúng định dạng ảnh"
            }
        )
    }

    const newPath = 'http://localhost:3000/' + path.substring(path.indexOf('public'));

    const modelUrl = 'http://localhost:3000/public/model_v1/model.json';

    const model = await tf.loadLayersModel(modelUrl);
    const labels = require(`${MODEL_DIR_PATH}/model_v1/metadata.json`).labels;
    // console.log(labels);
    // model.summary();

    try {
        const image = await Jimp.read(newPath);
        image.cover(224, 224, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);

        const NUM_OF_CHANNELS = 3;
        let values = new Float32Array(224 * 224 * NUM_OF_CHANNELS);

        let i = 0;
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
            pixel.r = pixel.r / 127.0 - 1;
            pixel.g = pixel.g / 127.0 - 1;
            pixel.b = pixel.b / 127.0 - 1;
            pixel.a = pixel.a / 127.0 - 1;
            values[i * NUM_OF_CHANNELS + 0] = pixel.r;
            values[i * NUM_OF_CHANNELS + 1] = pixel.g;
            values[i * NUM_OF_CHANNELS + 2] = pixel.b;
            i++;
        });

        const outShape = [224, 224, NUM_OF_CHANNELS];
        let img_tensor = tf.tensor3d(values, outShape, 'float32');
        img_tensor = img_tensor.expandDims(0);

        const predictions = await model.predict(img_tensor).dataSync();
        let data = []

        for (let i = 0; i < predictions.length; i++) {
            const label = labels[i];
            const probability = predictions[i];
            console.log(`${label}: ${probability}`);
            data.push({
                label: label,
                probability: probability
            })
        }

        const filteredData = data.filter(item => item.probability > BASE_PROBABILITY)
        const sortedData = filteredData.sort((a, b) => b.probability - a.probability)
        const results = await Promise.all(filteredData.map(async (item) => {
            const foodByLabel = await food.findOne(
                { name: { $regex: new RegExp(item.label, "i") } },
                { _id: 1, name: 1, image: 1, tags: 1, like: 1, rate: 1 }
            );
            if (!foodByLabel) {
                return null
            }
            return { ...foodByLabel._doc, label: item.label, probability: item.probability };
        }));

        const resultsSorted = results.sort((a, b) => b.probability - a.probability);

        return res.status(200).json({
            machineSearch: sortedData,
            result: resultsSorted
        })

    } catch (error) {
        return res.status(401).json({
            text: "lỗi ngoài dự kiến"
        })
    }
}

module.exports = { searchByImage };
