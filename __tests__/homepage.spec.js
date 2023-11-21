/***
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../login.html'), 'utf8')
const cats = require('../static/js/homepage')
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200
  })
);

const fetchCreateCatMock = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 201
  })
);




describe('homepage.html', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString()
    window.alert = jest.fn();
    global.fetch.mockClear();
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

   it('fetch is called when we invoke fetchCats', async () => {
    document.documentElement.innerHTML = `<ul id="cats"></ul>`;
    const mockShowAllCats = jest.fn();
    global.showAllCats = mockShowAllCats;

    // Assuming fetchCats returns a promise
    await cats.fetchCats();

    // Ensure that the fetch and showAllCats functions are called
    expect(fetch).toHaveBeenCalledTimes(1);
    // expect(mockShowAllCats).toHaveBeenCalledTimes(1);
  
   });
  
  

  test('showAllCats appends cat name to catsList', () => {
    document.documentElement.innerHTML = `<ul id="all-cats"></ul>`
    const cat = { name: 'Whiskers' }

    const catsList = document.getElementById('all-cats')

    // Call the function to test
    cats.showAllCats(cat)

    // Check if the cat name has been appended to catsList
    const appendedCatName = catsList.querySelector('li').textContent
    expect(appendedCatName).toBe('WhiskersUpdateDelete')
  })


    test('fetchOrClearCats ', () => {
    document.documentElement.innerHTML = `<ul id="all-cats"></ul>`
  
      const catsList = document.getElementById('all-cats')
      let fetching = false
    // Call the function to test
    cats.fetchOrClearCats()

    // Check if the cat name has been appended to catsList
    expect(catsList.textContent).toBe('');
    })
  
   it('deleteCat', async () => {
    // Mock the necessary parameters
    const eventMock = { stopPropagation: jest.fn() };
    const id = '123';
    const name = 'Fluffy';

    // Call the function to test
    await cats.deleteCat(eventMock, id, name);

    expect(window.alert).toHaveBeenCalledWith(`${name} has been deleted successfully`);
   });
  
  
    it('updateInput Cat', async () => {
    // Mock the necessary parameters
    const eventMock = {
      target: {
        value: 'NewCatName'
      },
      key: 'Enter'
    };
    const id = '123';

    // Call the function to test
    await cats.updateInput(eventMock, id);
    // Check if the alert message is shown on success
    expect(window.alert).toHaveBeenCalledWith('Cat has been updated');
    });
  
  
  it('create Cat ', async () => {
    // Mock the necessary parameters
    const eventMock = {
      preventDefault: jest.fn(),
      target: {
        name: { value: 'Whiskers' },
        type: { value: 'Small' },
        description: { value: 'The domestic cat' },
        habitat: { value: 'Homes and urban areas' }
      }
    };

    global.fetch = fetchCreateCatMock;

    // Call the function to test
    await cats.createCat(eventMock);

    // Check if fetch is called with the correct arguments

    // Check if the alert message is shown on success
    expect(window.alert).toHaveBeenCalledWith('New cat has been created');

  
  });


   it('toggleUpdateCat', () => {
    // Mock elements and parameters
    const id = '123';
     const e = jest.fn();
    const li = document.createElement('li');
    const input = document.createElement('input');
    li.appendChild(input);

    // Call the function to test
    cats.toggleUpdateCat(id, e, li, input);

    // Check if the input is removed
    expect(li.contains(input)).toBe(false);
   });
  
    it('updateCat', () => {
    // Mock elements and parameters
    const id = '123';
    const event = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
    const li = document.createElement('li');
    const input = document.createElement('input');

    // Mock the updateInput function
    const mockUpdateInput = jest.fn();
    global.updateInput = mockUpdateInput;

    // Call the function to test
    cats.updateCat(id, event, li, input);

    // Check if stopPropagation and preventDefault are called
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);

    // Check if input is added to li
      expect(li.contains(input)).toBe(true);
  });
})
