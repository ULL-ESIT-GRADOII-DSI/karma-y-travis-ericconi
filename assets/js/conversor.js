(function(exports) {
  "use strict";
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
    
    
  function Medida(valor,tipo)  {
    this.valor = valor || 0;
    this.tipo = tipo || "no-definido";
   
  }
   
  Medida.constructor = Medida;  
  
  function Temperatura(valor,tipo){
    Medida.this(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }// fin temperatura
 
 
  Temperatura.prototype = new Medida(); // herencia
  Temperatura.prototype.constructor = Temperatura;
  
  function Celsius(valor){
    Temperatura.call(this, valor, "C");
    /*Funcion para pasar de celsius a farenheit*/
    this.toFarenheit = function(){
      return (( valor * 9/5) + 32);
    };
    /*Funcion para pasar de celsius a kelvin*/
    this.toKelvin = function(){
      return (valor + 273.15);
    };  
    
  } // fin Celsius

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  
  function Farenheit(valor){
    /*Funcion para pasar de  farenheit a celsius*/
    this.toCelsius = function(){
      return((valor - 32) * 5/9);
    };
    /*Funcion para pasar de farenheit a kelvin*/
    this.toKelvin = function(){
      return((valor + 459.67) * 5/9); 
    };
  }
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;
  
 
  function Kelvin(valor){
    this.toCelsius = function(){
      return (valor - 273.15);
    }
    this.toFarenheit = function(){
      return(valor * 9/5 - 459.67);  
    }
  }
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;
  
  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor     = valor.match(regexp);
    
    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);
      
      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
        
        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
