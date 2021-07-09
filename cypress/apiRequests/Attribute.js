export function createAttribute({
  name,
  attributeValues = ["value"],
  type = "PRODUCT_TYPE",
  inputType = "DROPDOWN"
}) {
  const values = attributeValues.map(element => `{name:"${element}"}`);
  const mutation = `mutation{
    attributeCreate(input:{
      name:"${name}"
      valueRequired:false
      type:${type}
      values: [${values}]
      inputType: ${inputType}
    }){
      attribute{
        id
        name
        choices(first: 100){
          edges{
            node{
              name
            }
          }
        }
      }
      attributeErrors{
        field
        message
      }
    }
  }`;
  return cy
    .sendRequestWithQuery(mutation)
    .its("body.data.attributeCreate.attribute");
}

export function getAttributes(first, search) {
  const mutation = `query{
    attributes(first:${first}, filter:{
      search:"${search}"
    }){
      edges{
        node{
          id
          name
        }
      }
    }
  }`;
  return cy
    .sendRequestWithQuery(mutation)
    .then(resp => resp.body.data.attributes.edges);
}

export function deleteAttribute(attributeId) {
  const mutation = `mutation{
    attributeDelete(id:"${attributeId}"){
      attributeErrors{
        field
        message
      }
    }
  }`;
  return cy.sendRequestWithQuery(mutation);
}
