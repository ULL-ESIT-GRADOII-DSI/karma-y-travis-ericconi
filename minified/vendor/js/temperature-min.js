!function(t){"use strict";function o(t,o){Medida.call(this,t,o)}function e(t){o.call(this,t,"c")}function r(t){o.call(this,t,"f")}function n(t){o.call(this,t,"k")}o.prototype=new Medida,o.prototype.constructor=o,e.prototype=new o,e.prototype.constructor=e,Medida.measures.c=e,r.prototype=new o,r.prototype.constructor=r,Medida.measures.f=r,n.prototype=new o,n.prototype.constructor=n,Medida.measures.k=n,e.prototype.toFahrenheit=function(){var t=9*this.valor/5+32;return new r(t)},e.prototype.toKelvin=function(){return new n(this.valor+273.15)},r.prototype.toCelsius=function(){return new e(5*(this.valor-32)/9)},r.prototype.toKelvin=function(){return new n(5*(this.valor+459.67)/9)},n.prototype.toCelsius=function(){return new e(this.valor-273.15)},n.prototype.toFahrenheit=function(){return new r(1.8*(this.valor-273.15)+32)},t.Temperatura=o,t.Fahrenheit=r,t.Celsius=e,t.Kelvin=n}(this);