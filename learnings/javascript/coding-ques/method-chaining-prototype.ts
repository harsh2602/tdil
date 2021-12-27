function Land() {
  this.area = '';
  this.status = 'For Sale';
}

Land.prototype.open = function () {
  this.status = 'Open for Sale';
  return this;
};

Land.prototype.close = function () {
  this.status = 'Not for Sale';
  return this;
};

Land.prototype.setParams = function (area) {
  this.area = area;
  return this;
};

Land.prototype.doorStatus = function () {
  console.log('The', this.area, 'Land is', this.status);
  return this;
};

const land = new Land();
land
  .setParams('500 sq ft')
  .doorStatus()
  .close()
  .doorStatus()
  .open()
  .doorStatus();
