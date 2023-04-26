module.exports = () => ({
  plugins: {
    autoprefixer: [
      ">0.3%",
      "not ie 11",
      "not dead",
      "not op_mini all",
      "last 3 version",
      "Chrome >= 35",
      "Firefox >= 38",
      "Edge >= 10",
      "Explorer >= 10",
      "ie >= 10",
      "iOS >= 8",
      "Safari >= 8",
      "Android 2.3",
      "Android >= 4",
      "Opera >= 12"
    ]
  }
})