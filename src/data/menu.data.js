const coffeeMenuData = {
  coffees: [
    {
      id: 1,
      title: 'Flat White',
      subOptions: {
        optionTypeName: 'Cups',
        options: [
          {
            name: 'Small',
            price: 4.50,
            code: 'cp-s',
          },
          {
            name: 'Regular',
            price: 5.00,
            code: 'cp-r',
          },
          {
            name: 'Large',
            price: 5.50,
            code: 'cp-l',
          },
        ],
      },
    },
    // {
    //   id: 2,
    //   title: 'Flat White',
    //   subOptions: false,
    // },
    {
      id: 2,
      title: 'Irish coffee',
      subOptions: false,
      price: 6.00,
      code: 'ir-cf',
    },
    {
      id: 3,
      title: 'Latte',
      subOptions: {
        optionTypeName: 'Cups',
        options: [
          {
            name: 'Regular',
            price: 5.00,
            code: 'lt-r',
          },
          {
            name: 'Large',
            price: 5.50,
            code: 'lt-l',
          },
        ],
      },
    },
    {
      id: 4,
      title: 'Espresso',
      subOptions: {
        optionTypeName: 'Espresso Options',
        options: [
          {
            name: 'Shot',
            price: 4.00,
            code: 'es-s',
          },
          {
            name: 'Doppio',
            price: 5.00,
            code: 'es-d',
          },
        ],
      },
    },
  ],
};
export default coffeeMenuData;
