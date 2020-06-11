beforeEach(() => {
  Cypress.config('baseUrl', 'http://localhost:3000');
  cy.visit('/', { timeout: 30000 });
  cy.contains('.button', 'Add Business').click();
  
});

xdescribe('Tests general form functionality.', () => {
  it(`Visits the app, adds a business, and reopens the form to show that values are reset.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    cy.get(':nth-child(30) > :nth-child(1) > .input').type('12:40');
    cy.get(':nth-child(30) > :nth-child(2) > .input').type('23:59');
    cy.get(':nth-child(34) > :nth-child(1) > .input').type('00:15');
    cy.get(':nth-child(34) > :nth-child(2) > .input').type('3:17');
    cy.contains('.button', 'Submit').click();
    cy.contains('.button', 'Add Business').click();

    cy.get('[placeholder="Name"]').should('have.value', '');
    cy.get('[placeholder="Description"]').should('have.value', '');
    cy.get(':nth-child(2) > .select > select').should('have.value', '');
    cy.get('[placeholder="Latitude"]').should('have.value', '');
    cy.get('[placeholder="Longitude"]').should('have.value', '');
    cy.get('[placeholder="Email"]').should('have.value', '');
    cy.get(':nth-child(30) > :nth-child(1) > .input').should('have.value', '');
    cy.get(':nth-child(30) > :nth-child(2) > .input').should('have.value', '');
    cy.get(':nth-child(34) > :nth-child(1) > .input').should('have.value', '');
    cy.get(':nth-child(34) > :nth-child(2) > .input').should('have.value', '');
  });
});

describe('Tests frontend validation.', () => {
  xit(`Visits the app and cancels adding business to close form.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.contains('.button', 'Cancel').click();
    cy.get('[placeholder="Name"]').should('not.exist');
  });

  it(`Visits the app, adds a business, and gets an alert confirmation.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    cy.get(':nth-child(30) > :nth-child(1) > .input').type('12:40');
    cy.get(':nth-child(30) > :nth-child(2) > .input').type('23:59');
    cy.get(':nth-child(34) > :nth-child(1) > .input').type('00:15');
    cy.get(':nth-child(34) > :nth-child(2) > .input').type('3:17');



    var alerted = false;
    cy.on('window:alert', msg => alerted = msg);
    cy.server();
    cy.route('POST', 'http://localhost:4523/businesses').as('postBusiness');
    cy.contains('.button', 'Submit').click().then(() => {
      cy.wait('@postBusiness');
      expect(alerted).to.equal('Some Name added successfully.');
    })
    

    
    // cy.contains('.button', 'Submit').click() 
    // .then( () => expect(alerted).to.match(/Some Name added successfully./));
  });

  it(`Visits the app and adds business without name to get error.`, () => {
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- name \n');
      });
    
      
  });

  xit(`Visits the app and adds business without description to get error.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- description \n');
      });
  });

  xit(`Visits the app and adds business without type to get error.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- type \n');
      });
  });

  xit(`Visits the app and adds business with 'Unselected*' type to get error.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Unselected*');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    cy.contains('.button', 'Submit').click();
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- type \n');
      });
  });

  xit(`Visits the app and adds business without latitude to get error.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- latitude \n');
      });
  });

  xit(`Visits the app and adds business without longitude to get error.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- longitude \n');
      });
  });

  xit(`Visits the app and adds business without email to get error.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- email \n');
      });
  });

  xit(`Visits the app and adds business without any information to get all errors.`, () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n- name \n- description \n- type \n- longitude \n- latitude \n- email \n');
      });
  });


});
xdescribe('Tests frontend validation for time formatting.', () => {
  it(`Visits the app and adds essential information, but with an incorrect time as '35:40'.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    cy.get(':nth-child(30) > :nth-child(1) > .input').type('12:40');
    cy.get(':nth-child(30) > :nth-child(2) > .input').type('35:40');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n Opening times: 35:40 is not valid. Please use HH:MM e.g. 10:45 or 14:30.');
      });
  });

  it(`Visits the app and adds essential information, but with multiple incorrect formats.`, () => {
    cy.get('[placeholder="Name"]').type('Some Name');
    cy.get('[placeholder="Description"]').type('Some description.');
    cy.get(':nth-child(2) > .select > select').select('Catering');
    cy.get('[placeholder="Latitude"]').type('0');
    cy.get('[placeholder="Longitude"]').type('0');
    cy.get('[placeholder="Email"]').type('example@example.com');
    cy.get(':nth-child(30) > :nth-child(1) > .input').type('12:40A');
    cy.get(':nth-child(30) > :nth-child(2) > .input').type('412:40');
    cy.get(':nth-child(34) > :nth-child(1) > .input').type('42:40');
    cy.get(':nth-child(34) > :nth-child(2) > .input').type('AB:BC');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.contains('.button', 'Submit').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please enter the following: \n Opening times: 12:40A, 412:40, 42:40, AB:BC are not valid. Please use HH:MM e.g. 10:45 or 14:30.');
      });
  });
});
