import { createContext, useState } from "react";
import nursesData from "../Nurse/nurseData";

export const NurseContext = createContext();

export const NurseProvider = ({ children }) => {
  const [selectedNurse, setSelectedNurse] = useState(nursesData[0]);

  const selectNurse = (nurseId) => {
    const nurse = nursesData.find(n => n.id === nurseId);
    if (nurse) setSelectedNurse(nurse);
  };

  return (
    <NurseContext.Provider value={{ selectedNurse, selectNurse }}>
      {children}
    </NurseContext.Provider>
  );
};
