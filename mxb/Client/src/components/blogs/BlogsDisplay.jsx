import React, {useState} from 'react';
import { Paragraphe, TitreH2, LinkList, FullImage, TitreH3, ActionCode, ActionImage } from '../indexComponents';

function BlogsDisplay({components, key}) {

  // Créez un mapping des identifiants de composant vers les composants correspondants
  /* const componentMapping = {
      1: TitreH2,
      2: TitreH3,
      3: Paragraphe,
      4: LinkList,
      5: FullImage,
      6: ActionCode,
      7: ActionImage
  }; */

  const componentMap = {
    1: { 
        component: TitreH2,
        getProps: (content, index) => ({ 
            title: content.titre,
            textId: content.textId,
            isNew: content.isNew,
            isPreview: true
        })
    },
    2: {
        component: TitreH3,
        getProps: (content, index, deleteComponent, updateComponent) => ({ 
            /* Define props here */ 
        }),
    },
};

components.map((component, index) => {
  // Obtenez le composant React approprié et la fonction getProps à partir de l'objet de correspondance.
  const ComponentEntry = componentMap[component.componentId];
  if (!ComponentEntry) {
      // Si nous n'avons pas de composant pour ce componentId, nous pouvons choisir de rendre rien ou peut-être une sorte de composant par défaut.
      return null;
  }

  const { component: Component, getProps } = ComponentEntry;

  const props = getProps(component.content, index);

  return (<Component {...props} />);
});}

export default BlogsDisplay;

/*const renderedComponents = components.map((component, index) => {
        const Component = componentMapping[component.componentId];
    
        if (Component) {
          const content = JSON.parse(component.content);
          const componentProps = {
            ...content,
            isPreview: false,
            isNew: false,
            index: index,
            listText: Object.values(content),
          };
        
          console.log ('NULLLL', componentProps);
          return <Component key={`component-${index}`} {...componentProps} />;
        }
    
        return null;
      });
    
      console.log('maybeee', renderedComponents)
      return <>{renderedComponents}</>; */


     /*   // Parcours de la liste de composants
      components.forEach((component, index) => {
        // Obtenez le composant correspondant en utilisant le mapping
        const Component = componentMapping[component.componentId];
      
        // Vérifiez si le composant correspondant existe dans le mapping
        if (Component) {
          // Créez le composant avec les propriétés nécessaires
          const content = JSON.parse(component.content);
          const componentProps = {
            /* ...component.content, */

            /* title: content.titre : '', */
            /*isNew: false,
            index: index,
            isPreview: true,
            title: content.titre,
          };
          console.log("TRISTAN",componentProps);
          console.log("Vaseli", <Component {...componentProps} />);
      
          // Générez le composant
          return <Component {...componentProps} />;*/