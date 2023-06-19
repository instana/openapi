module.exports = EnhanceDescriptions;

/** @type {import('@redocly/cli').OasDecorator} */

function EnhanceDescriptions() {
  return {
    Server: {
      leave(Server) {
          console.log("Hello")  
      }
    }
  }
};