const P = require('pino');

// Export instance pino langsung agar .child() tersedia
const logger = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` });

module.exports = logger;
module.exports.default = logger;
//# sourceMappingURL=logger.js.map