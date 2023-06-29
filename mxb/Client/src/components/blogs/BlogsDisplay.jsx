import React, {useState} from 'react';
import { Paragraphe, TitreH2, LinkList, FullImage, TitreH3, ActionCode, ActionImage } from '../indexComponents';

function BlogsDisplay({components}) {
    // Créez un mapping des identifiants de composant vers les composants correspondants
    const componentMapping = {
        1: TitreH2,
        2: TitreH3,
        3: Paragraphe,
        4: LinkList,
        5: FullImage,
        6: ActionCode,
        7: ActionImage
      };
      
      // Parcours de la liste de composants
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
            isNew: false,
            index: index,
            isPreview: true,
            title: content.titre,
          };
          console.log("TRISTAN",componentProps);
          console.log("Vaseli", <Component {...componentProps} />);
      
          // Générez le composant
          return <Component {...componentProps} />;
        }
        return null; // Composant inconnu, vous pouvez gérer cette situation selon vos besoins
      });

}

export default BlogsDisplay    
    