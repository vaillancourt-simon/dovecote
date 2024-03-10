import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItemDivider,
} from "@ionic/react";
import SearchBar from "../components/SearchBar";
import ProfileResults from "../components/ProfileResults";

const Tab1: React.FC = () => {
  const [profiles, setProfiles] = useState([]);

  const handleSearch = (searchResults) => {
    setProfiles(searchResults);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste d'amis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "20px" }}>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div>
            <ProfileResults profiles={profiles} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
