beforeEach(() => {
  cy.visit('/', { timeout: 30000 });
});

xdescribe('Test clicking markers.', () => {
  it(`Visits the app and clicks on a Marker and check if the text`, () => {
    cy.get('#gmimap0').find('area').click({ force: true });
    cy.get('h4').type(`Joey's Ice Cream`);
  });

  it(`Visits the app and clicks on a marker, then clicks away to close box.`, () => {
    cy.get('#gmimap0').find('area').click({ force: true });
    cy.get('h4').type(`Joey's Ice Cream`);
    cy.get('.gm-style-iw button.gm-ui-hover-effect').click();
    cy.get('h4').should('not.exist');
  });

  it(`Visits the app and clicks on a marker Joey's Ice Cream to open box, then clicks on Rob's Ice cream to hide Joey's Ice Cream and replace with Rob's Ice cream.`, () => {
    cy.get('#gmimap0').find('area').click({ force: true });
    cy.get('h4').type(`Joey's Ice Cream`);
    cy.get('#gmimap1').find('area').click({ force: true });
    cy.get('h4').type(`Rob's Ice Cream`);
    cy.get('.gm-style-iw button.gm-ui-hover-effect').click();
    cy.get('h4').should('not.exist');
  })
});

xdescribe('Test filtering markers with select box.', () => {
  it(`Checks if markers exists, then filters by Transport.`, () => {
    //Check all 3 markers 
    cy.get('#gmimap0').find('area').click({ force: true });
    cy.get('h4').should('have.text', `Joey's Ice Cream`);
    cy.get('#gmimap1').find('area').click({ force: true });
    cy.get('h4').should('have.text', `Rob's Ice Cream`);
    cy.get('#gmimap2').find('area').click({ force: true });
    cy.get('h4').should('have.text', `Joey's Taxi`);

    //Check that the first two markers do not exist and last is not Ice Cream.
    cy.get(':nth-child(1) > select').select('Transport'); //Filters by Ice Cream
    cy.get('#gmimap0').should('not.exist');
    cy.get('#gmimap1').should('not.exist');
    cy.get('#gmimap3').click({force: true});
    cy.get('h4').should('not.have.text', `Joey's Ice Cream`);
    cy.get('h4').should('not.have.text', `Rob's Ice Cream`);
  });

  it(`Checks if markers exists, then filters by Ice Cream.`, () => {
    //Check all 3 markers 
    cy.get('#gmimap0').find('area').click({ force: true });
    cy.get('h4').should('have.text', `Joey's Ice Cream`);

    cy.get('#gmimap1').find('area').click({ force: true });
    cy.get('h4').should('have.text', `Rob's Ice Cream`);
    cy.get('#gmimap2').find('area').click({ force: true });

    cy.get('h4').should('have.text', `Joey's Taxi`);

    cy.get('select').select('Catering'); //Filters by Ice Cream
    cy.get('#gmimap2').should('not.exist');
    cy.get('#gmimap3').find('area').click({ force: true }); //joey ice
    cy.get('h4').should('not.have.text', `Joey's Taxi`);
    cy.get('#gmimap4').find('area').click({ force: true }); //rob ice
    cy.get('h4').should('not.have.text', `Joey's Taxi`);
  });
});