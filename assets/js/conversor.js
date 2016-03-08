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
    Temperatura.call(this, valor, "c");
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
  
  
  //Exportamos todas las clases creadas
  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;
  
  
  exports.convertir = function() {
    var valor = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp = XRegExp = ('^\\s*(?<number> [-+]?\\d+(?:.\\d*)?)                         # NUMERO            \n' +
                          '\\s*(?:e(?<exp> [-+]?\\d+))?                                   # EXPONENTE         \n' +
                          '\\s*(?<type> (                                                 # INICIO DEL TIPO   \n' +
                          '([kK](e|el|elv|elvi|elvin))?                                   #KELVIN           \n' +
                          '([fF](a|ar|are|aren|arenh|arenhe|arenhei|arenheit))?           #FARENHEINT \n' +
                          '([Cc](e|el|els|elsi|elsiu|elsius))?                            #CELSIUS   \n' +
                          '))                                                             # FIN DEL TIPO      \n' +
                          '((?:\\s+to)?\\s+(?<to> (                                       # TO                \n' +
                          '([kK](e|el|elv|elvi|elvin))?                                   #KELVIN             \n' +
                          '([fF](a|ar|are|aren|arenh|arenhe|arenhei|arenheit))?           #FARENHEINT \n' +
                          '([Cc](e|el|els|elsi|elsiu|elsius))?                            #CELSIUS   \n' +
                          ')))?\\s*$', 'xi');
                
/*
    Expresion por defecto
        ^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i
*/
        
        
        valor = valor.match(regexp);
    
        if (valor) {
          var numero = valor.number,
          tipo = valor.type[0].toLowerCase(),
          to = valor.to[0].toLowerCase();
          numero = parseFloat(numero);
          
          if (valor.exp) {
             var exp = parseInt(valor.exp);
             numero = numero * Math.pow(10, exp);
          }
          console.log("Valor: " + numero + ", Tipo: " + tipo);
      
          switch (tipo) {
              case 'c':
                  var celsius = new Celsius(numero);
                  if (to == 'f'){
                    elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
                  } else if (to == 'k'){
                    elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
                  } else {
                    elemento.innerHTML = "Error! Conversión no permitida";
                  }
              break;
            case 'f':
                  var farenheit = new Farenheit(numero);
                  if(to == 'c'){
                    elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
                  } else if(to == 'k'){
                     elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
                  } else{
                     elemento.innerHTML = "Error! Conversión no permitida";
                  }
            break;
              
            case 'k':
                  var kelvin = new Kelvin(numero);
                  if(to == 'c'){
                    elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
                  }else if(to == 'f'){
                    elemento.innerHTML = kelvin.toFarenheuit().toFixed(2) + " Farenheit";
                  } 
                  else {
                     elemento.innerHTML = "Error! Conversión no permitida";
                  }
            break;
            default:
              elemento.innerHTML = "Error! Conversión no permitida"; 
          }
        } else{
          elemento.innerHTML = "Error! Conversión no permitida"; 
        }
      };
})(this);
