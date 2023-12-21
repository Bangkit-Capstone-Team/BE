const natural = require("natural");

function extractFeatures(contents) {
  return contents.map((content) => `${content.title} ${content.description}`);
}

const queryContent = async (
  query,
  data_content,
  pageNumber = 1,
  pageSize = 10
) => {
  try {
    let tfidf = new natural.TfIdf();
    let features = extractFeatures(data_content);

    // Tambahkan setiap dokumen ke dalam TF-IDF
    features.forEach((doc) => {
      tfidf.addDocument(doc);
    });

    // Kalkulasi skor kesamaan dengan dokumen yang ada
    let result = [];
    tfidf.tfidfs(query, function (i, measure) {
      result.push({ index: i, similarity: measure });
    });

    // Mengurutkan array berdasarkan total similarity secara descending
    const sorted = result.sort((a, b) => b.similarity - a.similarity);

    // Menghitung indeks awal dan akhir untuk pagination
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;

    let final = [];
    sorted.slice(startIndex, endIndex).forEach((item) => {
      // Ambil data_content untuk index tertinggi
      final.push(data_content[item.index]);
    });

    // Mengembalikan hasil similarity yang telah diurutkan
    return final;
  } catch (error) {
    console.error("Error querying content:", error);
    throw error;
  }
};

module.exports = {
  extractFeatures,
  queryContent,
};
