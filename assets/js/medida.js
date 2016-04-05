(function(exports) {
"use strict";
var medida_valor = new XRegExp( '^\\s*(?<numero> [-+]?\\d+(?:\\.\\d*)?)                                # NUMERO            \n' +
                        '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                        '\\s*(?<tipo> ('                                                                     +
                        '[a-z]+                                                                              \n' +
                        '))','xi');

function Medida(valor,tipo)  {

  if(tipo){
    this.valor = valor;
    this.tipo = tipo;
  }
  else{
    var verificar = XRegExp.exec(valor, medida_valor);
    if(verificar){
      this.valor = verificar.numero;
      this.tipo = verificar.tipo;
    }
  }

};
var x = new Medida("32F");
var regexp = new XRegExp('^\\s*(?<numero> [-+]?\\d+(?:\\.\\d*)?)                                # NUMERO            \n' +
                    '\\s*(?:e(?<exp> [-+]?\\d+))?                                           # EXPONENTE         \n' +
                    '\\s*(?<tipo> ('                                                                     +
                    '[a-z]+                                                                    \n' +
                    '))                                                                     # FIN DEL TIPO      \n' +


                    '((?:\\s+to)?\\s+(?<destino> (                                               # TO                \n' +
                    '([a-z]+                                                                                  \n' +
                    '))))\\s*$', 'xi');

Medida.match = function(valor){
  return XRegExp.exec(valor, regexp);
}

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
         numero = numero * Math.pow(10, exp);
      }

      try {
        var source = new measures[tipo](numero);  // new Fahrenheit(32)
        var target = "to"+measures[destino].name; // "toCelsius"
        return source[target]().valor.toFixed(2) + " "+target; // "0 Celsius"
      }
      catch(err) {
        return 'Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"';
      }
    }
    else
      return "Introduzca una temperatura valida: 330e-1 F to C";
  };
  exports.Medida = Medida;
})(this);
