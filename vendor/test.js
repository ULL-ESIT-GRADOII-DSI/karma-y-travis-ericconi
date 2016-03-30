
var expect = chai.expect;

/* =============== Clase Medida =============== */

describe("Medida", function () {
  describe("constructor", function() {
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
});


/* =============== Clase Temperatura =============== */

describe("Clase Temperatura", function () {
  describe("constructor temperatura", function() {
    it("deberia tener un constructor", function() {
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

