import React from "react";
import { IonList, IonItem, IonAvatar, IonLabel } from "@ionic/react";

export interface Profile {
  id: number;
  name: string;
  image: string;
  bio: string;
  gender: string;
  distance: number;
  orientation: string;
}

interface Props {
  profiles: Profile[];
}

const ProfileResults: React.FC<Props> = ({ profiles }) => {

    console.log("Profiles reçus dans ProfileResults:", profiles);

  return (
    <IonList>
      {profiles.map((profile) => (
        <IonItem key={profile.id}>
          {/* <IonAvatar slot="start">
            <img src={profile.image} alt={profile.name} />
          </IonAvatar> */}
          <IonLabel>
            <h2>{profile.name}</h2>
            <p>{profile.bio}</p>
            <p>Genre: {profile.gender === 'men' ? 'Homme' : profile.gender === 'women' ? 'Femme' : 'Non-binaire'}</p>
            <p>Distance: {profile.distance} km</p>
            <p>Orientation: {translateOrientation(profile.orientation)}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

// Une fonction d'aide pour traduire les valeurs d'orientation en termes plus descriptifs
function translateOrientation(orientation: string): string {
  switch(orientation) {
    case "heterosexual": return "Hétérosexuel";
    case "homosexual": return "Homosexuel";
    case "bisexual": return "Bisexuel";
    case "asexual": return "Asexuel";
    case "pansexual": return "Pansexuel";
    default: return "Non spécifié";
  }
}

export default ProfileResults;
