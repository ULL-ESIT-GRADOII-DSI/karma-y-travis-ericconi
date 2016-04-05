
var expect = chai.expect;

/* =============== Clase Medida =============== */

describe("Medida", function () {
  describe("Constructor", function() {
    it("Existe un Constructor", function() {
      var medida = new Medida(32, 'c');
      expect(medida.valor).to.equal(32);
      expect(medida.tipo).to.equal('c');
    });
    it("Debe aceptar una cadena del tipo: '23f'", function(){
      var medida = new Medida('23F');
      expect(medida.valor).to.equal('23');
      expect(medida.tipo).to.equal('F');
   });
    it("Debe aceptar una cadena del tipo: '23k'", function(){
      var medida = new Medida('23K');
      expect(medida.valor).to.equal('23');
      expect(medida.tipo).to.equal('K');
   });
    it("Debe aceptar una cadena del tipo: '23c'", function(){
      var medida = new Medida('23C');
      expect(medida.valor).to.equal('23');
      expect(medida.tipo).to.equal('C');
   });
  });
  describe("Convertir", function () {
   it("Debería cazar bien", function () {
        var valor = Medida.match('330f to c');
        
        expect(parseFloat(valor.numero)).to.equal(330);
        expect(valor.tipo).to.equal('f');
        expect(valor.destino).to.equal('c');
      });
    it("debería realizar la conversión bien", function () {
        var valor = Medida.convertir('330e-1 F to C');
        expect(valor).to.equal('0.56 toCelsius');
      });
    it("Debería fallar cuando no se conozca la conversión", function () {
        var valor = Medida.convertir('330f to j');
        expect(valor).to.equal('Desconozco como convertir desde "f" hasta "j"');
      });
    it("Debería indicar que se introduzca una temperatura correcta", function () {
        var valor = Medida.convertir('330fj');
        expect(valor).to.equal('Introduzca una temperatura valida: 330e-1 F to C');
      });
  
  });
});

