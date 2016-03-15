
(function(exports) {
  "use strict";
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */



  var regexp = XRegExp('^\\s*(?<number> [-+]?\\d+(\\.\\d*)?)                                # NUMERO            \n' +
                    '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                    '\\s*(?<type> ('                                                                     +
                    '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                    '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius\n' +
                    '(k|ke|kel|kelv|kelvi|kelvin)                     \n' +
                    '))                                                                     # FIN DEL TIPO      \n' +
                    '((?:\\s+to)?\\s+(?<to> (                                               # TO                \n' +
                    '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                    '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius \n' +
                    '(k|ke|kel|kelv|kelvi|kelvin) \n' +
                    ')))\\s*$', 'xi');


      
  exports.convertir = function() {
    var valor = document.getElementById('convert').value,
        elemento  = document.getElementById('converted');
        /* Extienda la RegeExp a la especificación. use una XRegExp */


/*
    Expresion por defecto
        ^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i
*/


         valor = XRegExp.exec(valor, regexp);

        if (valor) {
        var numero = parseFloat(valor.number),
          tipo  = valor.type[0].toLowerCase(),
          to = valor.to;

          if(to){
            to = to[0].toLowerCase();
          }
          if (valor.exp) {
             var exp = parseInt(valor.exp);
             numero = numero * Math.pow(10, exp);
          }
          console.log("Valor: " + numero + ", Tipo: " + tipo);

          switch (tipo) {
              case 'c':
                  var celsius = new Celsius(numero);
                  if (to == 'f'){
                    elemento.innerHTML = celsius.toFahrenheit().toFixed(2) + " Fahrenheit";
                  } else if (to == 'k'){
                    elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
                  } else {
                    elemento.innerHTML = "Error! Conversión no permitida";
                  }
              break;
            case 'f':
                  var fahrenheit = new Fahrenheit(numero);
                  if(to == 'c'){
                    elemento.innerHTML = fahrenheit.toCelsius().toFixed(2) + " Celsius";
                  } else if(to == 'k'){
                     elemento.innerHTML = fahrenheit.toKelvin().toFixed(2) + " Kelvin";
                  } else{
                     elemento.innerHTML = "Error! Conversión no permitida";
                  }
            break;

            case 'k':
                  var kelvin = new Kelvin(numero);
                  if(to == 'c'){
                    elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
                  }else if(to == 'f'){
                    elemento.innerHTML = kelvin.toFahrenheit().toFixed(2) + " Fahrenheit";
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
