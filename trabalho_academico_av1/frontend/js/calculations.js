module.exports = {
  media(data) {
    return (
      data.reduce((c, n) => {
        return c + n;
      }) / data.length
    );
  },

  variancia(data) {
    let m = this.media(data);
    return parseFloat(
      Math.sqrt(
        data
          .map((d) => {
            return Math.pow(d - m, 2);
          })
          .reduce((c, n) => {
            return c + n;
          }) / data.length
      ).toFixed(2)
    );
  }
};
