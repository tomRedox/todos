// This version of the Todos example app doesn't run tests yet, since some of that functionality
// will be improved in Meteor 1.3. Hence, we are going to ignore this file.
return;

/* eslint-env mocha */
/* global Todos Lists Factory chai withRenderedTemplate */

const StubCollections = Package['stub-collections'] && Package['stub-collections'].StubCollections;

describe('Lists_show', () => {
  beforeEach(() => {
    StubCollections.stub([Todos, Lists]);
  });

  afterEach(() => {
    StubCollections.restore();
  });

  it('renders correctly with simple data', () => {
    const list = Factory.create('list');
    const timestamp = new Date();
    const todos = _.times(3, (i) => {
      return Factory.create('todo', {
        listId: list._id,
        createdAt: new Date(timestamp - (3 - i))
      });
    });

    const data = {
      list: () => list,
      todosReady: true,
      todos: list.todos()
    };

    withRenderedTemplate('Lists_show', data, el => {
      const todosText = todos.map(t => t.text).reverse();
      const renderedText = $(el).find('.list-items input[type=text]')
        .map((i, e) => $(e).val())
        .toArray();
      chai.assert.deepEqual(renderedText, todosText);
    });
  });
});
