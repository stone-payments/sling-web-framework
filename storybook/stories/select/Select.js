import 'sling-web-component-select'

export default {
    name: 'storybook-select',

    template: `
        <div>
            <h1>Normal</h1>
            <sling-select></sling-select>

            <h1>Disabled</h1>
            <sling-select disabled></sling-select>
        </div>
    `,

    mounted: () => {
        const mockData = [
		    {
		      name: 'Option 1',
		      id: 1,
		    },
		    {
		      name: 'Option 2',
		      id: 2,
		    },
		    {
		      name: 'Option 3',
		      id: 3,
		    },
		    {
		      name: 'Option 4',
		      id: 4,
		    },
		    {
		      name: 'Option 5',
		      id: 5,
		    },
		    {
		      name: 'Option 6',
		      id: 6,
		    },
		    {
		      name: 'Option 7',
		      id: 7,
		    },
		    {
		      name: 'Option 8',
		      id: 8,
		    },
	  	];

	  const $select = document.querySelector('sling-select');

	  $select.srcoptions = mockData;
    }

};
