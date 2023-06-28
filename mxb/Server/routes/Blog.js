const express = require("express");
const router = express.Router();
const { Blog_Components, Blogs, Comments } = require('../models');
const multer = require('multer');
const path = require('path');


// Pour enregistrer les images principales du blog dans le dossier images_blogs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images_blogs');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `main-image-${req.params.blogId}${ext}`)
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // Limite de taille à 25 Mo
  },
});

// Pour enregistrer les images des components
const storageOther = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images_blogs/images_components');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `image-component-${req.body.componentId}${ext}`)
  }
})

const uploadOther = multer({ storage: storageOther })

/* #region  Components */

// Route pour sauvegarder un component dans la base de données
router.post("/save-component", async (req, res) => {
    try {
        const { component, blogId } = req.body;

        const newComponent = await Blog_Components.create({
            name: component.name,
            componentId: component.componentId,
            content: JSON.stringify(component.content),
            blogId: blogId,
        });

        res.status(200).json(newComponent.id);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
        console.error(error);
    }
});

// Route pour avoir tous les components d'un blog
router.get("/get-component/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const components = await Blog_Components.findAll({
            where: {blogId: id}
        })
        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."})
        console.error(error);        
    }
});

// Route pour mettre a jour un component
router.put("/update", uploadOther.single('image'), async (req, res) => {
  try {
      let component = JSON.parse(req.body.component);
      const componentToUpdate = await Blog_Components.findByPk(component.id);

      // Set the image path if an image was uploaded
      if (req.file) {
        const imagePath = req.file.path.replace(/\\/g, '/');
        component.content.imageSrc = imagePath;
      }

      componentToUpdate.content = JSON.stringify(component.content);

      await componentToUpdate.save();
      res.status(200).json(componentToUpdate);
  } catch(error) {
      res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
      console.error(error);
  }
});

// Route pour supprimer un component
router.delete("/delete/:componentId", async (req, res) => {
    try {
        const { componentId } = req.params;
        const componentToDelete = await Blog_Components.findByPk(componentId);

        await componentToDelete.destroy();
        res.status(200).json("Deleted");
    } catch(error) {
        res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
        console.error(error);
    }
})
/* #endregion */

/* #region  Blogs */

// Route pour créer un nouveau blog
router.post('/new', async (req,res) => {
    try {
        const { title, author } = req.body;
        
        const newBlog = await Blogs.create({
            title: title,
            author: author,
            description: 'description',
            category: null,
        });

        res.status(200).json(newBlog)
    } catch(error) {
        res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
        console.error(error);
    }
});

// Route pour sauvegarder un blog
router.put('/save/:blogId', upload.single('image'), async (req, res) => {
    try {
        const { title, description, alt_image, public, url, category } = req.body;
        const { blogId } = req.params;

        const blogToUpdate = await Blogs.findByPk(blogId);

        blogToUpdate.title = title;
        blogToUpdate.description = description;
        blogToUpdate.alt_image = alt_image;
        public ? blogToUpdate.public = public : '';
        blogToUpdate.url = url;
        category ? blogToUpdate.category = category : '';

        if (req.file) {
          const imagePath = req.file.path.replace(/\\/g, '/');
          blogToUpdate.image = imagePath;
        }

        await blogToUpdate.save();
        res.status(200).json(blogToUpdate);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
        console.error(error);
    }
});

// Route pour acceder au images
router.use('/images_blogs', express.static('images_blogs'));

// Route pour avoir tous les blogs
router.get('/blog', async (req, res) => {
  try{
    const blogs = await Blogs.findAll({
      include: [
        {
          model: Blog_Components,
          as: 'components', // Spécifiez l'alias ici
        },
      ],
    })
    res.status(200).json(blogs);
  }
  catch (error) {
    res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
    console.error(error);
  }
})

// Route pour avoir le contenu d'un blog
router.get('/blog/:blogId', async (req, res) => {
  try{
    const { blogId } = req.params;
    const blog = await Blogs.findByPk(blogId, {
      include: [
        {
          model: Blog_Components,
          as: 'components', // Spécifiez l'alias ici
        },
      ],
    })
    res.status(200).json(blog);
  }
  catch (error) {
    res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
    console.error(error);
  }
})

// Route pour supprimer un blog
router.delete('/delete-blog/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;

    const blogToDelete = await Blogs.findByPk(blogId);

    await blogToDelete.destroy();
    res.status(200).json("Blog deleted !");
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue. Veuillez réessayer plus tard."});
    console.error(error);
  }
})

/* #endregion */
/* #region  Comments */
router.get('/get-comments/:blogId'), async (req, res) => {
  try{
    const {blogId} = req.params;
    const comments = await Comments.findAll({ where: {blogId: blogId}})
    res.json(comments)
  } catch (error) {
    res.status(500).json({error: "Une erreur est survenue. Veuillez réessayer plus tard"})
    console.error(error);
  }
}

router.post("/create-comments", async (req, res) => {
  try{
    const comment = req.body
    await Comments.create(comment)
    res.json(comment)
  }catch(error){
    res.status(500).json({error: "Une erreur est survenue. Veuillez réessayer plus tard"})
    console.error(error);
  }
})
/* #endregion */



module.exports = router;

/*
// Route pour avoir les infos d'un utilisateur
app.get('/users/:id/poste', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
});
// Route pour avoir les events
app.get('/events/:isTeam/:teamId', async (req, res) => {
  try {
      const userId = req.user.id;
      const { isTeam, teamId } = req.params;
      const isTeamBool = isTeam === 'true';
      var events;
      
      if (isTeamBool) {
          events = await Events.findAll({
              where: {
                  teamId: teamId,
              }
          })
      } else {
          events = await Events.findAll({
          where: {
              userId: userId,
              teamId: {
                [Op.in]: req.teams,
              },
          }
      })
      }
      
      res.status(200).json(events);
  } catch (error) {
      logger.error("Erreur pour fetch les events", error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
  }
});
// Route pour avoir tous les clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { userId: req.user.id },
    });
    
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }
});
// Route pour créer un custom field
app.post('/custom-field/:isTeam', protectRoute, async (req, res) => {
    try {
      const { isTeam } = req.params;
      const { customField } = req.body;
      let newCustomField;
  
      if (isTeam) {
        newCustomField = await Customs_Fields.create({
          name: customField,
        })
      } else if (isTeam === false) {
        newCustomField = await Team_Customs_Fields.create({
          name: customField,
        })
      }
  
      res.status(201).json(newCustomField);
    }
    catch (error) {
      logger.error("Erreur pour ajouter un champ personnalisé", error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
  });
  
  // Route pour avoir tous les customs fields d'un user
  app.get('/customs-fields/:isTeam/:teamId', protectRoute, async (req, res) => {
    try {
      const { isTeam, teamId } = req.params;
      const isTeamBool = isTeam === 'true';
      let customsFields;
  
  
      if (isTeamBool) {
        customsFields = await Team_Customs_Fields.findAll({
          where: {
            teamId: teamId,
          }
        })
      } else if (isTeamBool === false) {
        customsFields = await Customs_Fields.findAll({
          where: {
            userId: req.user.id,
          }
        })
      }
  
      if (!customsFields) {
        return res.status(404).json({ error: 'Customs Fields not found'});
      }
  
      res.status(200).json(customsFields);
    }
    catch (error) {
      logger.error("Erreur pour avoir les customs fields", error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
  })
  
  // Route pour ajouter un champ personnalisé à plusieurs clients
  app.put('/clients/custom-field',[
    check('clientIds').isArray(),
    check('customField').isObject(),
  ], protectRoute, async (req, res) => {
    try {
      const { clientIds, customField } = req.body;
      let clients;
      
      // Fetch all clients in the clientIds array
      clients = await Client.findAll({
        where: {
          id: clientIds
        }
      });
    
      if (!clients || clients.length === 0) {
        return res.status(404).json({ error: 'Clients not found' });
      }
  
      // Add custom field to each client
      for (let client of clients) {
        // Clone existing custom fields array
        let customsFields = [...client.customs_fields];
  
        // Add the new custom field
        customsFields.push(customField);
  
        // Save the updated customs_fields
        client.customs_fields = customsFields;
        await client.save();
      }
      
      res.status(200).json({message: 'Custom fields updated successfully.'});
    }
    catch (error) {
      console.error('Erreur pour modifier les clients :', error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'})
    }
  });
  

  // Route pour ajouter une tache
  app.post('/tasks',[
    check('name').isString(),
    check('clientId').isInt(),
    check('steps').isArray(),
  ], protectRoute, async (req, res) => {
    try {
      const { name, clientId, steps } = req.body;
  
      const task = await Task.create({
        name,
        clientId,
        userId: req.user.id,
        statue: "Active",
        steps: steps.map((step) => ({
          content: step,
          completed: false,
        })),
      });
  
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour avoir tous les taches de l'utilisateur
  app.get('/my-tasks', protectRoute, async (req, res) => {
    try {
      const tasks = await Task.findAll({
        where: {
          userId: req.user.id,
        },
        include: [Client], // Pour inclure les informations du client
      });
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour supprimer une tache
  app.delete('/tasks/:id', protectRoute, async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      if (task.userId !== req.user.id) {
        return res.status(403).json({ error: 'This task is not yours' });
      }
  
      await task.destroy();
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour acceder au details d'une tache
  app.get('/tasks/:id/:isTeam', protectRoute, async (req, res) => {
    try {
        const { id, isTeam } = req.params;
        const isTeamBool = isTeam === 'true';
        let task;
        const userTeams = req.teams;
  
        if (isTeamBool) {
          task = await Team_Tasks.findByPk(id, {
            include: [Team_Clients],
          }); 
          if (!userTeams.includes(Number(task.teamId))) {
            return res.status(403).json({ error: 'This task is not yours' });
          }
        } else {
          task = await Task.findByPk(id, {
            include: [Client],
          });
          if (req.user.id !== task.userId) {
            return res.status(403).json({ error: 'This task is not yours' });
          }
        }
  
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
  
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour mettre à jour une tâche
  app.put('/tasks/:taskId/:isTeam', protectRoute, async (req, res) => {
    try {
      const { taskId, isTeam } = req.params;
      const isTeamBool = isTeam === 'true';
      const { name, clientId, steps, statue } = req.body;
      let task;
  
      if (isTeamBool) {
        task = await Team_Tasks.findByPk(taskId);
      } else {
        task = await Task.findByPk(taskId);
      }
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Update the task with the new data
      task.name = name;
      task.clientId = clientId;
      task.steps = steps; 
      task.statue = statue;
  
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour ajouter une étape de faite à un utilisateur
  app.put('/step-update', protectRoute, async (req, res) => {
    try {
      const { value, isTeam, teamId } = req.body;
      const userId = req.user.id;
  
      const todayDate = new Date().toLocaleDateString('fr-CA'); // Obtenez la date d'aujourd'hui au format souhaité
  
      let user;
      let teamMember;
  
      if (isTeam === "true") {
        teamMember = await Team_Members.findOne({
          where: {
            userId: userId,
            teamId: teamId
          }
        })
      }
  
      user = await Users.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }
  
      let stepsDone = user.steps_done || [];
  
  
      const todayIndex = stepsDone.findIndex((step) => step.date === todayDate);
  
  
      if (todayIndex !== -1) {
        // La date d'aujourd'hui existe déjà dans le tableau, mettre à jour le nombre d'étapes
        stepsDone[todayIndex].nbre_steps_done += value;
      } else {
        // La date d'aujourd'hui n'existe pas dans le tableau, ajouter un nouvel objet
        stepsDone.push({ date: todayDate, nbre_steps_done: value });
  
      }
  
      if (stepsDone.length > 7) {
        stepsDone.shift(); // Supprime le premier élément (le plus ancien) si le tableau a plus de 7 éléments
      }
  
      user.steps_done = stepsDone; // Met à jour le champ steps_done
  
      if(isTeamBool) {
        let stepsDoneTeam = teamMember.steps_done || [];
  
        const todayIndexTeam = stepsDoneTeam.findIndex((step) => step.date === todayDate);
        if (todayIndexTeam !== -1) {
          stepsDoneTeam[todayIndexTeam].nbre_steps_done += value;
        } else {
          stepsDoneTeam.push({ date: todayDate, nbre_steps_done: value });
        }
  
        if (stepsDoneTeam.length > 7) {
          stepsDoneTeam.shift(); // Supprime le premier élément (le plus ancien) si le tableau a plus de 7 éléments
        }
  
        teamMember.steps_done = stepsDoneTeam; 
        await teamMember.save();
      }
  
      await user.save(); // Enregistre les modifications dans la base de données
  
      res.status(200).json({ success: 'Étape mise à jour avec succès' });
    } catch (error) {
      logger.error("Erreur pour mettre à jour les étapes terminées", error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour avoir les steps_done
  app.get('/step-done', protectRoute, async (req, res) => {
    try {
  
      const user = await Users.findByPk(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }
  
      res.status(200).json(user.steps_done);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  
  // Route pour avoir tous les tâches d'un user incluant celle de l'équipe
  app.get('/all-tasks', protectRoute, async (req, res) => {
    try {
      const { id, username } = req.user;
  
      const personalTasks = await Task.findAll({
        where: {
          userId: id,
        },
        include: [Client],
      })
  
      const teamTasksWithAllMembers = await Team_Tasks.findAll({
        where: {
          assignTo: {
            [Op.substring]: 'Tous les membres',
          },
        },
        include: [Team_Clients, Teams],
      });
  
      const teamTasksWithMembers = await Team_Tasks.findAll({
        where: {
          assignTo: {
            [Op.like]: `%${JSON.stringify(username)}%`,
          },
        },
        include: [Team_Clients, Teams],
      });
  
      const mergedTasks = [
        ...teamTasksWithAllMembers,
        ...teamTasksWithMembers,
        ...personalTasks,
      ];
  
      res.status(200).json(mergedTasks)
    }
    catch (error) {
      console.error('Error getting all tasks:', error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
  });
  
  
  
  
  
  // Route pour créer une équipe
  app.post('/team',[
    check('name').isString(),
    check('team_code').isString(),
  ], protectRoute, async (req, res) => {
    try {
      const { name, team_code } = req.body;
  
      // Créer l'équipe
      const team = await Teams.create({
        name,
        team_code,
      });
  
      // Créer un enregistrement dans la table Team_Members pour le créateur de l'équipe
      await Team_Members.create({
        teamId: team.id,
        userId: req.user.id,
        username: req.user.username,
      });
  
      res.status(201).json(team);
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour accéder à toutes les équipes dont l'utilisateur fait partie
  app.get('/teams', protectRoute, async (req, res) => {
    try {
      const { id } = req.user;
  
      const teamMemberships = await Team_Members.findAll({
        where: {
          userId: id,
        },
        include: {
          model: Teams, // Inclure le modèle Teams
          as: 'team', // Utiliser l'alias 'team' défini dans l'association
        },
      });
      
      // Extraire les données de l'équipe et les mettre dans un nouveau tableau
      const teams = teamMemberships.map(teamMembership => teamMembership.team);
  
      res.status(200).json(teams);
    } catch (error) {
      console.error('Erreur pour obtenir les équipes :', error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour rejoindre une équipe
  app.put('/join-team', protectRoute, async (req, res) => {
    try {
      const { id } = req.user;
      const { team_code } = req.body;
  
      // Rechercher l'équipe en fonction du code de l'équipe
      const team = await Teams.findOne({
        where: {
          team_code: team_code,
        },
      });
  
      if (!team) {
        return res.status(404).json({ message: 'Équipe non trouvée' });
      }
  
      const isMember = await Team_Members.findAll({
        where: {
          teamId: team.id,
          userId: id,
        }
      })
  
      if (isMember) {
        return res.status(403).json({ message: 'Cette utilisateur est déja membre de cette équipe' });
      } else {
        // Ajouter l'utilisateur à l'équipe dans la table Team_Members
        await Team_Members.create({
          teamId: team.id,
          userId: req.user.id,
          username: req.user.username,
        });
      }
  
      res.status(200).json();
    } catch (error) {
      logger.error('Erreur pour rejoindre la team :', error);
      res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  });
  
  // Route pour quitter une équipe
  app.put('/leave-team', protectRoute, async (req, res) => {
    try {
      const { id } = req.user;
      const { teamId } = req.body;
  
      // Vérifier si l'utilisateur est membre de l'équipe
      if (!req.teams.includes(Number(teamId))) {
        return res.status(403).json({ error: 'User is not a member of this team' });
      }
  
      const teamMember = await Team_Members.findOne({
        where: {
          teamId: teamId,
          userId: id,
        },
      });
      
      if (!teamMember) {
        return res.status(404).json({ error: 'Team member not found' });
      }
  
      await teamMember.destroy();
  
      const isMember = await Team_Members.findAll({
        where: {
          teamId: teamId,
        }
      })
  
      if(isMember.length === 0) {
        const teamEmpty = await Teams.findByPk(teamId);
        await teamEmpty.destroy();
      }
  
      res.status(200).json({ message: 'Successfully left the team' });
    } catch (error) {
      console.error('Erreur pour quitter la team :', error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'})
    }
  });
  
  // Route pour ajouter un client dans l'équipe
  app.post('/team-client/:teamId',[
    check('name').isString(),
    check('email').isString(),
    check('company').isString(),
    check('phoneNumber').isString(),
    check('website').isString(),
  ], protectRoute, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, company, phoneNumber, website } = req.body;
      const { teamId } = req.params;
  
      // Vérifier si l'utilisateur est membre de l'équipe
      if (!req.teams.includes(Number(teamId))) {
        return res.status(403).json({ error: 'User is not a member of this team' });
      }
  
      const newTeamClient = await Team_Clients.create({
        name,
        email,
        company,
        phoneNumber,
        teamId,
        customs_fields: '',
        website, 
      });
  
      res.status(201).json(newTeamClient);
    } catch (error) {
      console.error('Erreur pour ajouter un client dans la team :', error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
  });
  
  // Route pour accéder à tous les clients d'un équipe 
  app.get('/team-clients/:teamId', protectRoute, async (req, res) => {
    try {
      const { teamId } = req.params;
  
      // Vérifier si l'utilisateur est membre de l'équipe
      if (!req.teams.includes(Number(teamId))) {
        return res.status(403).json({ error: 'User is not a member of this team' });
      }
  
      const teamClients = await Team_Clients.findAll({
        where: {teamId : teamId},
      });
  
      res.status(200).json(teamClients);
    } catch (error) {
      console.error("Erreur pour accéder au clients d'un équipe :", error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
  });
  
  // Route pour supprimer un client d'équipe
  app.delete('/team-client/:clientId', protectRoute, async (req, res) => {
    try {
      const { clientId } = req.params;
      const client = await Team_Clients.findByPk(clientId);
  
      // Vérifier si l'utilisateur est membre de l'équipe
      if (!req.teams.includes(Number(client.teamId))) {
        return res.status(403).json({ error: 'User is not a member of this team' });
      }
  
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      await client.destroy();
      res.status(200).json({ message: 'Client deleted' });
    } 
    catch (error) {
      console.error("Erreur pour supprimer un client d'équipe", error);
      res.status(500).json({error: 'Une erreur est survenue. Veuillez réessayer plus tard.'});
    }
  });
  
*/ 