'use strict';

const makeWASocket = require('./Socket/index.js');
const chalk = require('chalk');

console.log(chalk.hex('#8B0000')(`







                                                         *%%%%%%%=              
                                                  ..=@%%%#:  .%%%@=             
                                      :       :-%**             :#-:            
                                     =%+   :-::                  +@:            
               =#######+         -#- .%: * .               ##   -%=             
                  #@@@@@+     @@@@@@@#.   :*             #@@   -@=              
                    #@@@@@+.   -@@@@%*.  -@@@+.      .+@@@@  -%=                
                     .*%@@@@.=@@@@#:   =@@@@@@@+.  =+@@@@@@ +                   
                        :#@@@@@@#:    #- @@@**@@@*@@@@**@@@                     
                    #    +@@@@@@*    .   @@@+ .#@@@%.. +@@@                     
                .*.   -%@@@@%@@@@@+.     @@@+    %     +@@@                     
              .*=   -@@@@#:   *@@@@@@+-. *@@+          +@@@.                    
            .*%-  =@@@@#:    =+@@@@@@@@@@*+*#:         :#@@@                    
           .#@+ =-::                  #.  :=**:          :%@*                   
           :@@+             %@=       %.      -%.           %                   
           -@@@@=:::::=@%#-           *                      .                  
           .=:+#%@*++=                                                          









♯ DEVELOPER : @alexpepek
♯ CHANEL : @xeuming_testi
`));
console.log(chalk.hex('#6f00ff')('Bailxm by: @xeumingproject\n'));
console.log(chalk.hex('#6f00ff')('Modified from xbailz — XEU MING edition'));

// Re-export everything
Object.assign(module.exports, require('../WAProto/index.js'));
Object.assign(module.exports, require('./Utils/index.js'));
Object.assign(module.exports, require('./Types/index.js'));
Object.assign(module.exports, require('./Defaults/index.js'));
Object.assign(module.exports, require('./WABinary/index.js'));
Object.assign(module.exports, require('./WAM/index.js'));
Object.assign(module.exports, require('./WAUSync/index.js'));
Object.assign(module.exports, require('./Store/index.js'));

// Named + default export of makeWASocket
module.exports.makeWASocket = makeWASocket;
module.exports.default = makeWASocket;
