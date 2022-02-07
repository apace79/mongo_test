import sinon = require("sinon");

export const createLogger = () => {
  return {
    info: sinon.stub(),
    debug: sinon.stub(),
  };
};

export const createStore = () => {
  return {
    get: sinon.stub(),
    insert: sinon.stub(),
    clean: sinon.stub(),
  };
};
