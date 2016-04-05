
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





/* =============== Clase Temperatura =============== */

describe("Clase Temperatura", function () {
  describe("constructor", function() {
    it("Existe un constructor", function() {
      var temperatura = new Temperatura (32, 'c');
      expect(temperatura.valor).to.equal(32);
    });
    
    
  });
});



/* =============== Clase Ceslsius =============== */

describe("Celsius", function () {
  describe("constructor", function() {
    it("Existe un Constructor", function() {
      var celsius = new Celsius(32);
     expect(celsius.valor).to.equal(32);
    
    });
    it("Conversión a Kelvin", function() {
      		var celsius = new Celsius(32);
      		expect(celsius.toKelvin().valor).to.equal(305.15);
    	});
    it("Conversión a Fahrenheit", function() {
      		var celsius = new Celsius(32);
      		expect(celsius.toFahrenheit().valor).to.equal(89.6);
    	});
    
  });
});




/* =============== Clase Far =============== */
describe("Fahrenheit", function () {
  describe("constructor", function() {
    it("Existe un Constructor", function() {
      var far = new Fahrenheit(32);
      expect(far.valor).to.equal(32);
    });
    it("Conversión a Celsius", function() {
      		var far = new Fahrenheit(32);
      		expect(far.toCelsius().valor).to.equal(0);
    	});
    it("Conversión a Kelvin", function() {
      		var far = new Fahrenheit(32);
      		expect(far.toKelvin().valor).to.equal(273.15);
    	});
  });
});

/* =============== Clase Kelvin =============== */

describe("Kelvin", function () {
  describe("constructor", function() {
    it("Existe un Constructor", function() {
      var kel = new Kelvin(32);
      expect(kel.valor).to.equal(32);
    
    });
    it("Conversión a Celsius", function() {
      		var kel = new Kelvin(295);
      		expect(kel.toCelsius().valor).to.equal(21.850000000000023);
    });
    it("Conversión a Fahrenheit", function() {
      		var kel = new Kelvin(295);
      		expect(kel.toFahrenheit().valor).to.equal(71.33000000000004);
    });
  });
});


var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(window.console, "log");
    sandbox.stub(window.console, "error");
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });


describe("Sinon", function() {
    it("Error al introducir mal la temperatura", function() {
      (Medida.convertir('32f j'));
      sinon.assert.notCalled(console.log);
      sinon.assert.calledOnce(console.error);
      sinon.assert.calledWithExactly(console.error, 'Desconozco como convertir desde "f" hasta "j"')
    });
     it("Reconoce exponente", function() {
      (Medida.convertir('330e-1 F to C'));
      sinon.assert.calledOnce(console.log);
      sinon.assert.notCalled(console.error);
      sinon.assert.calledWithExactly(console.log, 'Reconocido exponente')
    });

  });