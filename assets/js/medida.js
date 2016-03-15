  "use strict";
  

function Medida(valor,tipo)  {
    this.valor = valor || 32;
    this.tipo = tipo || "c";

  }

Medida.match = function(valor){
  
  var regexp = XRegExp('^\\s*(?<numero> [-+]?\\d+(\\.\\d*)?)                                # NUMERO            \n' +
                    '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                    '\\s*(?<tipo> ('                                                                     +
                    '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                    '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius\n' +
                    '(k|ke|kel|kelv|kelvi|kelvin)                     \n' +
                    '))                                                                     # FIN DEL TIPO      \n' +
                    '((?:\\s+to)?\\s+(?<destino> (                                               # TO                \n' +
                    '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                    '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius \n' +
                    '(k|ke|kel|kelv|kelvi|kelvin) \n' +
                    ')))\\s*$', 'xi');
  
   
  return XRegExp.exec(valor, regexp);
}
  
  Medida.measures = {};
  
  Medida.convertir = function(valor) {
    
    var measures = Medida.measures;
    
    
    measures.c = Celsius;
    measures.f = Fahrenheit;
    measures.k = Kelvin;
    
    var match = Medida.match(valor);
    
    if (match) {
      var numero = parseFloat(match.numero),
          tipo   = match.tipo,
          destino = match.destino;
  
      try {
        var source = new measures[tipo](numero);  // new Fahrenheit(32)
        var target = "to"+measures[destino].name; // "toCelsius"
        return source[target]().toFixed(2) + " "+target; // "0 Celsius"
      }
      catch(err) {
        return 'Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"';
      }
    }
    else
      return "Introduzca una temperatura valida: 330e-1 F to C";
  };
