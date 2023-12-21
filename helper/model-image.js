const tf = require("@tensorflow/tfjs");
const jpeg = require("jpeg-js");
const fs = require("fs");
const sharp = require("sharp");

// Load model dari file .h5
async function loadModel() {
  const model = await tf.loadGraphModel(
    "http://localhost:8080/tfjs_model/model.json"
  );
  return model;
}

const resizeImage = async (rgb_image) => {
  // Resize gambar menjadi 150 x 150
  const resizedImageBuffer = await sharp(rgb_image.data, {
    raw: { width: rgb_image.width, height: rgb_image.height, channels: 3 },
  })
    .resize(150, 150)
    .normalise()
    .toBuffer();

  return resizedImageBuffer;
};

const convertToRGB = async (image_path) => {
  // Baca gambar JPG
  const jpegData = fs.readFileSync(image_path);
  const rawImageData = jpeg.decode(jpegData, { useTArray: true });

  // Konversi RGBA ke RGB
  const rgb_image = {
    width: rawImageData.width,
    height: rawImageData.height,
    data: Buffer.alloc(rawImageData.width * rawImageData.height * 3),
  };

  for (let y = 0; y < rawImageData.height; y++) {
    for (let x = 0; x < rawImageData.width; x++) {
      const rgbaIdx = (rawImageData.width * y + x) << 2;
      const rgbIdx = (rawImageData.width * y + x) * 3;

      // Ambil nilai RGB dari nilai RGBA
      rgb_image.data[rgbIdx] = rawImageData.data[rgbaIdx];
      rgb_image.data[rgbIdx + 1] = rawImageData.data[rgbaIdx + 1];
      rgb_image.data[rgbIdx + 2] = rawImageData.data[rgbaIdx + 2];
    }
  }

  return rgb_image;
};

function readJsonFile(jsonFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        reject(null);
      } else {
        try {
          const classIndices = JSON.parse(data);
          resolve(classIndices);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          reject(null);
        }
      }
    });
  });
}

const image_reconition = async (image_path) => {
  try {
    const model = await loadModel();

    let rgb_image = await convertToRGB(image_path);
    let resizedImageBuffer = await resizeImage(rgb_image);

    const tensor = tf.tensor(Array.from(resizedImageBuffer));

    const reshapedTensor = tensor.reshape([1, 150, 150, 3]);

    // Normalisasi nilai pixel menjadi 0-1
    const normalizedTensor = reshapedTensor.div(255);

    // Lakukan prediksi
    const predictions = model.predict(normalizedTensor);

    // Mendapatkan hasil prediksi sebagai array JavaScript
    const predictionArray = await predictions.data();

    // Hapus tensor untuk menghindari memory leaks
    normalizedTensor.dispose();
    reshapedTensor.dispose();
    tensor.dispose();
    predictions.dispose();

    // Ambil indeks kelas dengan nilai probabilitas tertinggi sebagai hasil prediksi
    const predictedClassIndex = predictionArray.indexOf(
      Math.max(...predictionArray)
    );

    const jsonFilePath = "public/tfjs_model/class_indices.json";

    const predictPromise = readJsonFile(jsonFilePath);

    // Menanggapi hasil Promise
    let predict = await predictPromise.then((classIndices) => {
      if (classIndices) {
        // Dapatkan label kelas yang benar berdasarkan predictedClassIndex
        const predictedClassLabel = Object.keys(classIndices).find(
          (key) => classIndices[key] === predictedClassIndex
        );

        return predictedClassLabel;
      } else {
        return null;
      }
    });
    return { status: predict ? true : false, predict };
  } catch (error) {
    console.log(error);
    return { status: false, predict: null };
  }
};

module.exports = {
  loadModel,
  image_reconition,
};
