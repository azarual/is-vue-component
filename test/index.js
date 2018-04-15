const { Vue, isVueComponent } = window;
const createContainer = () => {
  const container = document.createElement('div');

  container.className = 'container';
  document.body.appendChild(container);

  return container;
};

describe('is-vue-component', () => {
  it('should return false if it is an empty object', () => {
    expect(isVueComponent({})).to.be.false;
  });

  it('should return false if it is not an object', () => {
    expect(isVueComponent([])).to.be.false;
  });

  describe('el', () => {
    it('should return true if it is a non-empty string', (done) => {
      const container = createContainer();
      const component = {
        el: '#app',
      };

      expect(isVueComponent(component)).to.be.true;
      container.id = 'app';
      component.created = done;
      new Vue(component).$mount();
    });

    it('should return true if it is an element', (done) => {
      const container = createContainer();
      const component = {
        el: container,
      };

      expect(isVueComponent(component)).to.be.true;
      component.mounted = done;
      new Vue(component).$mount();
    });

    it('should return false if it is a document object', () => {
      expect(isVueComponent({
        el: document,
      })).to.be.false;
    });

    it('should return false if it is an empty string', () => {
      expect(isVueComponent({
        el: '',
      })).to.be.false;
    });

    it('should return false if it is an empty object', () => {
      expect(isVueComponent({
        el: {},
      })).to.be.false;
    });
  });

  describe('template', () => {
    it('should return true if it is a nom-empty string', (done) => {
      const component = {
        template: '<p>Hello, World!</p>',
      };

      expect(isVueComponent(component)).to.be.true;
      component.mounted = done;
      new Vue(component).$mount(createContainer());
    });

    it('should return false if it is an empty string', () => {
      expect(isVueComponent({
        template: '',
      })).to.be.false;
    });

    it('should return false if it is not a string', () => {
      expect(isVueComponent({
        template: null,
      })).to.be.false;
    });
  });

  describe('render', () => {
    it('should return true if it is a function', (done) => {
      const component = {
        render(createElement) {
          return createElement('p', 'Hello, World!');
        },
      };

      expect(isVueComponent(component)).to.be.true;
      component.mounted = done;
      new Vue(component).$mount(createContainer());
    });

    it('should return true if it is not a function', () => {
      expect(isVueComponent({
        render: null,
      })).to.be.false;
    });
  });

  describe('extends', () => {
    it('should return true if it is a valid Vue component', (done) => {
      const component = {
        extends: {
          render(createElement) {
            return createElement('p', 'Hello, World!');
          },
        },
      };

      expect(isVueComponent(component)).to.be.true;
      component.mounted = done;
      new Vue(component).$mount(createContainer());
    });

    it('should return false if it is not a valid Vue component', () => {
      expect(isVueComponent({
        extends: {
          render: null,
        },
      })).to.be.false;
    });
  });

  describe('mixins', () => {
    it('should return true if it is an array includes at least a valid Vue component.', (done) => {
      const component = {
        mixins: [
          {
            render(createElement) {
              return createElement('p', 'Hello, World!');
            },
          },
        ],
      };

      expect(isVueComponent(component)).to.be.true;
      component.mounted = done;
      new Vue(component).$mount(createContainer());
    });

    it('should return false if it is an empty array.', () => {
      expect(isVueComponent({
        mixins: [],
      })).to.be.false;
    });

    it('should return false if it is not an array.', () => {
      expect(isVueComponent({
        mixins: {},
      })).to.be.false;
    });
  });
});
