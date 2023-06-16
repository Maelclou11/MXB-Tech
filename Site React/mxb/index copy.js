/* #region  Configuration */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const sequelize = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: '*',
  };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.contentSecurityPolicy()); // Content Security Policy
app.use(helmet.hsts());

// Configurer Winston pour la surveillance des logs
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // va créer un fichier nommé error.log et y mettre tous les erreurs qu'ont va lui envoyé en rajoutant la ligne : logger.error("Message que l'on veux", error);
        new winston.transports.File({ filename: 'combined.log' }), // va créer un fichier nommé combined.log et y mettre tous les messages qu'ont veux avec cette ligne : logger.info("Message que l'on veux envoyé", <contenu du message ici>)
    ],
  });
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));

/* #endregion */

/*#region  =-=-=-=-=-=-=-=-= Routes =-=-=-=-=-=-=-=-=  */

// Routers
const blogRouter = require('./Server/routes/Blog');
app.use("/blog", blogRouter);


/* #endregion */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
