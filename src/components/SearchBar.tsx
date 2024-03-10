import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";

const sampleProfiles = [
  { id: 1, name: "Alex", image: "/path/to/image1.jpg", bio: "Bio de Alex", gender: "men", age: 25, distance: 10, orientation: "heterosexual" },
  { id: 2, name: "Sam", image: "/path/to/image2.jpg", bio: "Bio de Sam", gender: "women", age: 30, distance: 5, orientation: "bisexual" },
  // Ajoutez plus de profils selon les besoins...
];

interface SearchData {
  searchTerms: string;
  filters: {
    gender: string;
    age: { lower: number; upper: number };
    distance: number;
    orientation: string;
  };
}

const SearchBar = ({onSearch}) => {
  
  const [searchData, setSearchData] = useState<SearchData>({
    searchTerms: "",
    filters: {
      gender: "women",
      age: { lower: 18, upper: 50 },
      distance: 50,
      orientation: "heterosexual",
    },
  });

  const handleSearch = () => {

    // Filtrage des profils basés sur les critères. C'est un exemple basique.
    const filteredProfiles = sampleProfiles.filter(profile => {
      const ageMatch = profile.age >= searchData.filters.age.lower && profile.age <= searchData.filters.age.upper;
      const distanceMatch = profile.distance <= searchData.filters.distance && profile.distance >= 0; // Supposer distance comme distance maximale
      const genderMatch = profile.gender === searchData.filters.gender;
      const orientationMatch = profile.orientation === searchData.filters.orientation;
  
      return ageMatch && distanceMatch && genderMatch && orientationMatch;
    });
  
    // Utilisation de onSearch (passée par props depuis Tab1) pour mettre à jour l'état avec les profils filtrés
    onSearch(filteredProfiles);
  };
  

  const handleFilterChange = (name: string, value: any) => {
    setSearchData({
      ...searchData,
      filters: {
        ...searchData.filters,
        [name]: value,
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barre de recherche</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Genre</IonLabel>
          <IonSelect
            value={searchData.filters.gender}
            onIonChange={(e) => handleFilterChange("gender", e.detail.value)}
          >
            <IonSelectOption value="men">Homme</IonSelectOption>
            <IonSelectOption value="women">Femme</IonSelectOption>
            <IonSelectOption value="nonbinary">Non-binaire</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>
            Âge: {searchData.filters.age.lower} - {searchData.filters.age.upper}
          </IonLabel>
          <IonRange
            dualKnobs={true}
            min={18}
            max={100}
            step={1}
            value={searchData.filters.age}
            onIonChange={(e) => handleFilterChange("age", e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Distance: {searchData.filters.distance} km</IonLabel>
          <IonRange
            min={0}
            max={200}
            step={1}
            value={searchData.filters.distance}
            onIonChange={(e) => handleFilterChange("distance", e.detail.value as number)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Orientation</IonLabel>
          <IonSelect
            value={searchData.filters.orientation}
            onIonChange={(e) => handleFilterChange("orientation", e.detail.value)}
          >
            <IonSelectOption value="heterosexual">Hétérosexuel</IonSelectOption>
            <IonSelectOption value="homosexual">Homosexuel</IonSelectOption>
            <IonSelectOption value="bisexual">Bisexuel</IonSelectOption>
            <IonSelectOption value="asexual">Asexuel</IonSelectOption>
            <IonSelectOption value="pansexual">Pansexuel</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton expand="block" onClick={handleSearch}>
          Rechercher
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SearchBar;

