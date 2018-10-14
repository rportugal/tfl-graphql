import createModels from './models';

class ContextFactory {
  static create() {
    return {
      models: createModels()
    };
  }
}

export default ContextFactory;
