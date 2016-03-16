"use strict";
  

function Medida(valor,tipo)  {
   var constr = XRegExp( '^\\s*(?<numero> [-+]?\\d+(?:\\.\\d*)?)                                # NUMERO            \n' +
                        '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                        '\\s*(?<tipo> ('                                                                     +
                        '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                        '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius\n' +
                        '(k|ke|kel|kelv|kelvi|kelvin)                    \n' +
                        '))','xi');

   var verificar = XRegExp.exec(valor, constr);

  if(verificar){
    this.valor = verificar.numero;
    this.tipo = verificar.tipo;
  }
  else{
    this.valor = valor;
    this.tipo = tipo;

  }

};
var x = new Medida("32F");

Medida.match = function(valor){
  
  var regexp = XRegExp('^\\s*(?<numero> [-+]?\\d+(?:\\.\\d*)?)                                # NUMERO            \n' +
                    '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                    '\\s*(?<tipo> ('                                                                     +
                    '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                    '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius\n' +
                    '(k|ke|kel|kelv|kelvi|kelvin)                    \n' +
                    '))                                                                     # FIN DEL TIPO      \n' +
                    
                    
                    '((?:\\s+to)?\\s+(?<destino> (                                               # TO                \n' +
                    '(f|fa|fah|fahr|fahre|fahren|fahrenh|fahrenhe|fahrenhei|fahrenheit)|    # FAHRENHEIT \n' +
                    '(c|ce|cel|cels|celsi|celsiu|celsius)|                                  # Celsius \n' +
                    '(k|ke|kel|kelv|kelvi|kelvin)  \n' +
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
          tipo   = match.tipo[0].toLowerCase(),
          destino = match.destino[0].toLowerCase();
          
      if (match.exp) {
         var exp = parseInt(match.exp);
         numero = numero * Math.pow(10, exp);
      }
  
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
