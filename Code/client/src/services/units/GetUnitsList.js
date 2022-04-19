import { useState, useEffect } from "react";
import units from "./units";

export function GetUnitsList() {
    const [unitsList, setUnit] = useState([]);

    useEffect(() => {
        updateUnits()
    }, [])
  
    const updateUnits = async () => {
      const response = await units.getUnits();
      if (response) {
        const json = await response.content;
        setUnit(json);
      }
    };
  
    return [unitsList, updateUnits];
}