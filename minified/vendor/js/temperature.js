(function(exports) {
    "use strict";


  /*========================================= CLASE TEMPERATURA ========================================= */

  function Temperatura(valor,tipo){
    Medida.call(this,valor,tipo);             /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

  Temperatura.prototype = new Medida(); // herencia
  Temperatura.prototype.constructor = Temperatura;




 /*========================================= CLASE CELSIUS ========================================= */

  function Celsius(valor){
    Temperatura.call(this, valor, "c");

  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  Medida.measures.c = Celsius;





 /* ========================================= CLASE FAHRENHEIT ========================================= */

  function Fahrenheit(valor){
    Temperatura.call(this, valor, "f");

  }
  Fahrenheit.prototype = new Temperatura();
  Fahrenheit.prototype.constructor = Fahrenheit;
  Medida.measures.f = Fahrenheit;





  /* ========================================= CLASE KELVIN ========================================= */

  function Kelvin(valor){

    Temperatura.call(this, valor, "k");


  }
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;
  Medida.measures.k = Kelvin;

//================== Metodos que devuelven objetos del tipo ============= //






/* ========================================= Celsius ========================================= */

Celsius.prototype.toFahrenheit = function (){
  var v = (this.valor * 9/5 ) + 32;
  return new Fahrenheit(v);
};


Celsius.prototype.toKelvin = function (){
  return new Kelvin( this.valor + 273.15);
};




/* ========================================= Fahrenheit ========================================= */

Fahrenheit.prototype.toCelsius = function () {
  return new Celsius(( this.valor - 32) * 5 / 9);
};
Fahrenheit.prototype.toKelvin = function () {
  return new Kelvin(( this.valor + 459.67) * 5 / 9);
};





/* ========================================= Kelvin ========================================= */

Kelvin.prototype.toCelsius = function () {
  return new Celsius(this.valor - 273.15);
};
Kelvin.prototype.toFahrenheit = function () {
  return new Fahrenheit((this.valor - 273.15) * (9 / 5) + 32);
};

    exports.Temperatura = Temperatura;
    exports.Fahrenheit = Fahrenheit;
    exports.Celsius = Celsius;
    exports.Kelvin = Kelvin;
})(this);
