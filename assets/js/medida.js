(function(exports) {
"use strict";
var medida_valor = '^\\s*(?<numero> [-+]?\\d+(?:\\.\\d*)?)                                # NUMERO            \n' +
                        '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                        '\\s*(?<tipo> ('                                                                     +
                        '[a-z]+                                                                              \n' +
                        '))';

function Medida(valor,tipo)  {

  if(tipo){
    this.valor = valor;
    this.tipo = tipo;
  }
  else{
    var verificar = XRegExp.exec(valor, XRegExp(medida_valor,'xi'));
    if(verificar){
      this.valor = verificar.numero;
      this.tipo = verificar.tipo;
    }
  }
}

var regexp = 
                    '((?:\\s+to)?\\s+(?<destino> (                                               # TO                \n' +
                    '([a-z]+                                                                                  \n' +
                    '))))\\s*$';

Medida.match = function(valor){
  return XRegExp.exec(valor, XRegExp(medida_valor + regexp,'xi'));
};

Medida.measures = {};

  Medida.convertir = function(valor) {

    var match = Medida.match(valor);
    var measures = Medida.measures;

    if (match) {
      var numero = parseFloat(match.numero),
          tipo   = match.tipo[0].toLowerCase(),
          destino = match.destino[0].toLowerCase();

      if (match.exp) {
         var exp = parseInt(match.exp);
         console.log("Reconocido exponente");
         numero = numero * Math.pow(10, exp);
      }

      try {
        var source = new measures[tipo](numero);  // new Fahrenheit(32)
        var target = "to"+measures[destino].name; // "toCelsius"
        return source[target]().valor.toFixed(2) + " "+target; // "0 Celsius"
      }
      catch(err) {
        console.error('Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"');
        return 'Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"';
      }
    }
    else
      return "Introduzca una temperatura valida: 330e-1 F to C";
  };
  exports.Medida = Medida;
})(this);
